import ScoreForm from "@/app/components/ScoreForm"
import { createClient } from '@/utils/supabase/server'

export default async function GameDetails({
    params, }: { params: { gameId: string } }) {

        // fetch game details
        // fetch scores
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser();
    
        console.log({user})
    
        // fetch scores data from db
        const { data: scores, error } = await supabase
            .from('scorer')
            .select('*')
            .eq('game_id', params.gameId)
            .order('created_at', { ascending: false })
    
        if (error) {
            console.error('Error fetching scores:', error.message)
            return <div>Error fetching games</div>
        }

        console.log({ scores })

        return (
            <>
            <div>
                <h1>Game Details</h1>
                <p>Game ID: {params.gameId}</p>
            </div>
            <div>
                <h2>Add Score</h2>
                <ScoreForm />
            </div>
            <div>
                {scores?.map((score) => (
                    <><div key={score.id} className="mb-4 p-4 bg-gray-800 rounded-lg shadow">
                        <h1 className="text-2xl text-white mb-2">Score</h1>
                        <h2 className="text-xl text-white mb-2">{score.player1_score} - {score.player2_score} - {score.player3_score} - {score.player4_score}</h2>
                        <p className="text-gray-400">created at: {new Date(score.created_at).toLocaleString()}</p>
                    </div></>
                ))}
            </div>
            </>

        )
}