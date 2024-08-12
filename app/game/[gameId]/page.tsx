import ScoreForm from "@/app/components/ScoreForm"
import { createClient } from '@/utils/supabase/server'
import SummaryBar from "@/app/components/SummaryBar";
import GameItem from "util/types"
import Link from "next/link";

export default async function GameDetails({
    params, }: { params: { gameId: string } }) {

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch game data from db
    const { data: game, error_getgame } = await supabase
        .from('game')
        .select('*')
        .eq('id', params.gameId);

    if (error_getgame) {
        console.error('Error fetching games:', error_getgame.message);
        return <div>Error fetching games</div>;
    }

    // Fetch scores data from db
    const { data: scores, error } = await supabase
        .from('game_scores_combined')
        .select('*')
        .eq('game_id', params.gameId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching scores:', error.message);
        return <div>Error fetching scores</div>;
    }

    return (
        <>
            <div className="flex justify-between items-center">
                <div className="text-center font-semibold text-3xl mb-2">
                    Game - {game[0].game_name}
                </div>

                <div className="flex justify-center">
                    <ScoreForm data={game[0]} />
                </div>

                <Link href='/'>
                    <button className="btn btn-neutral-content">Back</button>
                </Link>

            </div>

            <div>
                <SummaryBar game={game[0]} />
            </div>

            {scores ? (
                <div>
                    <div className="flex w-full flex-col border-opacity-50 gap-1">
                        {scores?.map((score) => (
                            <div key={score.id} className="p-2 m-2 rounded-lg shadow-md border-gray-100 border relative z-10">
                                <section className='flex justify-between'>
                                    <p className='w-1/3'></p>
                                    <p className="text-center text-lg m-1 w-1/3">{new Date(score.created_at).toLocaleString()}</p>
                                    <h1 className="text-2xl mb-2 text-center w-1/3"></h1>
                                </section>

                                <div className="grid grid-cols-4 gap-4 place-items-center">
                                    {/* Render player score details */}
                                    {/* Your player score details here */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (<>
                <section></section>
            </>)}
        </>
    )
}
