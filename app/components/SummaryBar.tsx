import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

type SummaryScore = {
    game_id: number,
    player1_name: string,
    player1_total_score: number,
    player2_name: string,
    player2_total_score: number,
    player3_name: string,
    player3_total_score: number,
    player4_name: string,
    player4_total_score: number,
    created_at: string,
    user_id: string,
}


const SummaryBar = async (
    { game_id }: { game_id: number }
) => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser();

    // console.log({ user })

    // fetch game scores summary from db
    const { data: summary, error } = await supabase
        .from('game_scores_summary')
        .select('*')
        .match({ game_id })

    if (error) {
        console.error("Error fetching game scores summary:", error.message);
    } else {
        console.log("Game Scores Summary:", summary);
    }

    const score = summary[0] as SummaryScore

    return (
        <>
            {score ? (


                <div>
                    <div key={score.game_id} className="p-2 m-2 rounded-lg shadow-md border-gray-100">

                        <section className='flex justify-between'>
                            <p className='w-1/3'></p>
                            <h1 className="text-2xl mb-2 text-center w-1/3">{score.game_id}</h1>
                            <p className="text-center w-1/3">{new Date(score.created_at).toLocaleString()}</p>
                        </section>

                        <div className="grid grid-cols-4 gap-4 place-items-center">
                            <section className='flex flex-col items-center'>
                                <div className="avatar placeholder">
                                    <div className={score.player1_total_score < 0 ? "bg-neutral text-neutral-content w-24 rounded-md ring-error ring-offset-base-100 ring ring-offset-2" : "bg-neutral text-neutral-content w-24 rounded-md ring-primary ring-offset-base-100 ring ring-offset-2"}>
                                        <div className="text-3xl">{score.player1_name.substring(0, 4)}</div>
                                    </div>
                                </div>

                                <div>
                                    <div className={score.player1_total_score < 0 ?
                                        "text-2xl text-error mt-1" : "text-2xl text-success mt-1"
                                    }>{score.player1_total_score}</div>
                                </div>


                            </section>

                            <section className='flex flex-col items-center'>
                                <div className="avatar placeholder">
                                    <div className={score.player2_total_score < 0 ? "bg-neutral text-neutral-content w-24 rounded-md ring-error ring-offset-base-100 ring ring-offset-2" : "bg-neutral text-neutral-content w-24 rounded-md ring-primary ring-offset-base-100 ring ring-offset-2"}>
                                        <div className="text-3xl">{score.player2_name.substring(0, 4)}</div>
                                    </div>
                                </div>

                                <div>
                                    <div className={score.player2_total_score < 0 ?
                                        "text-2xl text-error mt-1" : "text-2xl text-success mt-1"
                                    }>{score.player2_total_score}</div>
                                </div>

                            </section>

                            <section className='flex flex-col items-center'>

                                <div className="avatar placeholder">
                                    <div className={score.player3_total_score < 0 ? "bg-neutral text-neutral-content w-24 rounded-md ring-error ring-offset-base-100 ring ring-offset-2" : "bg-neutral text-neutral-content w-24 rounded-md ring-primary ring-offset-base-100 ring ring-offset-2"}>
                                        <div className="text-3xl">{score.player3_name.substring(0, 4)}</div>
                                    </div>
                                </div>

                                <div>
                                    <div className={score.player3_total_score < 0 ?
                                        "text-2xl text-error mt-1" : "text-2xl text-success mt-1"
                                    }>{score.player3_total_score}</div>
                                </div>
                            </section>

                            <section className='flex flex-col items-center'>
                                <div className="avatar placeholder">
                                    <div className={score.player4_total_score < 0 ? "bg-neutral text-neutral-content w-24 rounded-md ring-error ring-offset-base-100 ring ring-offset-2" : "bg-neutral text-neutral-content w-24 rounded-md ring-primary ring-offset-base-100 ring ring-offset-2"}>
                                        <div className="text-3xl">{score.player4_name.substring(0, 4)}</div>
                                    </div>
                                </div>

                                <div>
                                    <div className={score.player4_total_score < 0 ?
                                        "text-2xl text-error mt-1" : "text-2xl text-success mt-1"
                                    }>{score.player4_total_score}</div>
                                </div>
                            </section>
                        </div>



                    </div>
                </div>
            ) : (
                // new user with no summary
                <></>
            )}
        </>
    )
}

export default SummaryBar