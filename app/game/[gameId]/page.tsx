import ScoreForm from "@/app/components/ScoreForm";
import { createClient } from "@/utils/supabase/server";
import SummaryBar from "@/app/components/SummaryBar";
import Link from "next/link";

export default async function GameDetails({
  params,
}: {
  params: { gameId: string };
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch game data from db
  const { data: game, error_getgame } = await supabase
    .from("game")
    .select("*")
    .eq("id", params.gameId);

  if (error_getgame || !game || game.length === 0) {
    console.error("Error fetching games:", error_getgame?.message || "No game found");
    return <div>Error fetching game</div>;
  }

  // Fetch scores data from db
  const { data: scores, error } = await supabase
    .from("game_scores_combined")
    .select("*")
    .eq("game_id", params.gameId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching scores:", error.message);
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

        <Link href="/">
          <button className="btn btn-neutral-content">Back</button>
        </Link>
      </div>

      <div>
        <SummaryBar game={game[0]} />
      </div>

      {scores && scores.length > 0 ? (
        <div>
          <div className="flex w-full flex-col border-opacity-50 gap-1">
            {scores.map((score) => (
              <div
                key={score.id}
                className="p-2 m-2 rounded-lg shadow-md border-gray-100 border relative z-10"
              >
                <section className="flex justify-between">
                  <p className="w-1/3"></p>
                  <p className="text-center text-lg m-1 w-1/3">
                    {new Date(score.created_at).toLocaleString()}
                  </p>
                  <h1 className="text-2xl mb-2 text-center w-1/3"></h1>
                </section>

                <div className="grid grid-cols-4 gap-4 place-items-center">
                  {["player1", "player2", "player3", "player4"].map(
                    (player, index) => (
                      <section key={`${score.id}-${player}`} className="flex flex-col items-center">
                        <div className="avatar placeholder">
                          <div
                            className={
                              score[`${player}_score`] < 0
                                ? "bg-neutral text-neutral-content w-24 rounded-md ring-error ring-offset-base-100 ring ring-offset-2"
                                : "bg-neutral text-neutral-content w-24 rounded-md ring-primary ring-offset-base-100 ring ring-offset-2"
                            }
                          >
                            <div className="text-3xl">
                              {score[`${player}_name`]?.substring(0, 4)}
                            </div>
                          </div>
                        </div>

                        <div>
                          <div
                            className={
                              score[`${player}_score`] < 0
                                ? "text-2xl text-error mt-1"
                                : "text-2xl text-success mt-1"
                            }
                          >
                            {score[`${player}_score`]}
                          </div>
                        </div>
                      </section>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <section>No scores available</section>
      )}
    </>
  );
}
