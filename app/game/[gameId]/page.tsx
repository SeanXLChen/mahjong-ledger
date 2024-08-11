import ScoreForm from "@/app/components/ScoreForm"
import { createClient } from '@/utils/supabase/server'
import SummaryBar from "@/app/components/SummaryBar";

export default async function GameDetails({
    params, }: { params: { gameId: string } }) {

    // fetch game details
    // fetch scores
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser();

    // console.log({user})

    // fetch scores data from db
    const { data: scores, error } = await supabase
        .from('game_scores_combined')
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
            <div className="text-center text-4xl">
                Game ID: {params.gameId}
            </div>
            <div>
                <SummaryBar game_id={parseInt(params.gameId)} />
            </div>
            <div className="flex w-full flex-col border-opacity-50">
                <ScoreForm />
            </div>
            {scores ? (
    <div className="flex w-full flex-col border-opacity-50 gap-1">
        {scores?.map((score) => (
            <div key={score.id} className="p-2 m-2 rounded-lg shadow-md border-gray-100">
                <section className='flex justify-between'>
                    <p className='w-1/3'></p>
                    <h1 className="text-2xl mb-2 text-center w-1/3">{score.game_id}</h1>
                    <p className="text-center w-1/3">{new Date(score.created_at).toLocaleString()}</p>
                </section>

                <div className="grid grid-cols-4 gap-4 place-items-center">
                    <section className='flex flex-col items-center'>
                        <div className="avatar placeholder">
                            <div className={score.player1_score < 0 ? "bg-neutral text-neutral-content w-24 rounded-md ring-error ring-offset-base-100 ring ring-offset-2" : "bg-neutral text-neutral-content w-24 rounded-md ring-primary ring-offset-base-100 ring ring-offset-2"}>
                                <div className="text-3xl">{score.player1_name.substring(0, 4)}</div>
                            </div>
                        </div>

                        <div>
                            <div className={score.player1_score < 0 ?
                                "text-2xl text-error mt-1" : "text-2xl text-success mt-1"
                            }>{score.player1_score}</div>
                        </div>
                    </section>

                    <section className='flex flex-col items-center'>
                        <div className="avatar placeholder">
                            <div className={score.player2_score < 0 ? "bg-neutral text-neutral-content w-24 rounded-md ring-error ring-offset-base-100 ring ring-offset-2" : "bg-neutral text-neutral-content w-24 rounded-md ring-primary ring-offset-base-100 ring ring-offset-2"}>
                                <div className="text-3xl">{score.player2_name.substring(0, 4)}</div>
                            </div>
                        </div>

                        <div>
                            <div className={score.player2_score < 0 ?
                                "text-2xl text-error mt-1" : "text-2xl text-success mt-1"
                            }>{score.player2_score}</div>
                        </div>
                    </section>

                    <section className='flex flex-col items-center'>
                        <div className="avatar placeholder">
                            <div className={score.player3_score < 0 ? "bg-neutral text-neutral-content w-24 rounded-md ring-error ring-offset-base-100 ring ring-offset-2" : "bg-neutral text-neutral-content w-24 rounded-md ring-primary ring-offset-base-100 ring ring-offset-2"}>
                                <div className="text-3xl">{score.player3_name.substring(0, 4)}</div>
                            </div>
                        </div>

                        <div>
                            <div className={score.player3_score < 0 ?
                                "text-2xl text-error mt-1" : "text-2xl text-success mt-1"
                            }>{score.player3_score}</div>
                        </div>
                    </section>

                    <section className='flex flex-col items-center'>
                        <div className="avatar placeholder">
                            <div className={score.player4_score < 0 ? "bg-neutral text-neutral-content w-24 rounded-md ring-error ring-offset-base-100 ring ring-offset-2" : "bg-neutral text-neutral-content w-24 rounded-md ring-primary ring-offset-base-100 ring ring-offset-2"}>
                                <div className="text-3xl">{score.player4_name.substring(0, 4)}</div>
                            </div>
                        </div>

                        <div>
                            <div className={score.player4_score < 0 ?
                                "text-2xl text-error mt-1" : "text-2xl text-success mt-1"
                            }>{score.player4_score}</div>
                        </div>
                    </section>
                </div>
            </div>
        ))}
    </div>
) : (<></>)}

        </>

    )
}