import { createClient } from '@/utils/supabase/server'

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
    { game }: { game: GameItem }
) => {
    const supabase = createClient();

    // Fetch game scores summary from db
    const { data: summary, error } = await supabase
        .from('game_scores_summary')
        .select('*')
        .match({ game_id: game.id });

    if (error) {
        console.error("Error fetching game scores summary:", error.message);
    }

    const score: SummaryScore = summary?.[0] || {
        game_id: game.id,
        player1_name: game.player1_name,
        player1_total_score: 0,
        player2_name: game.player2_name,
        player2_total_score: 0,
        player3_name: game.player3_name,
        player3_total_score: 0,
        player4_name: game.player4_name,
        player4_total_score: 0,
        created_at: game.created_at,
        user_id: game.user_id,
    };

    return (
        <div>
            <div key={score.game_id} className="p-2 m-2 rounded-lg border-gray-900 border-spacing-1 bg-gray-200">
                <div className='flex flex-col justify-items-center'>
                    <section className='flex justify-between'>
                        <p className="text-xl text-center w-1/3"></p>
                        <h1 className="text-2xl mb-2 text-center font-bold w-1/3">Total</h1>
                        <p className="text-xl text-center w-1/3"></p>
                    </section>
                </div>

                <div className="grid grid-cols-4 gap-4 place-items-center">
                    {["player1", "player2", "player3", "player4"].map((player, index) => {
                        const playerName = score[`${player}_name`];
                        const playerTotalScore = score[`${player}_total_score`];

                        return (
                            <section key={index} className='flex flex-col items-center'>
                                <div className="avatar placeholder">
                                    <div className={playerTotalScore < 0 ? 
                                        "bg-neutral text-neutral-content w-24 rounded-md ring-error ring-offset-base-100 ring ring-offset-2" : 
                                        "bg-neutral text-neutral-content w-24 rounded-md ring-primary ring-offset-base-100 ring ring-offset-2"}>
                                        <div className="text-3xl">{playerName.substring(0, 4)}</div>
                                    </div>
                                </div>

                                <div>
                                    <div className={playerTotalScore < 0 ?
                                        "text-2xl text-error mt-1" : 
                                        "text-2xl text-success mt-1"}>
                                        {playerTotalScore}
                                    </div>
                                </div>
                            </section>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default SummaryBar;
