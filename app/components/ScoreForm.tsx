'use client'

import { useState } from "react";
import { addScore } from "../server-action/addScore";
import { usePathname } from "next/navigation";
import { GameItem } from "util/types";

export default function ScoreForm(
    { data }: { data: GameItem }
) {
    const [showModal, setShowModal] = useState(false);
    const initialScores = {
        player1: { score: 0, result: "win" },
        player2: { score: 0, result: "win" },
        player3: { score: 0, result: "win" },
        player4: { score: 0, result: "win" },
    };
    const [scores, setScores] = useState(initialScores);

    const game = usePathname();
    const gameId = game.split('/')[2];

    const handleScoreChange = (player, field, value) => {
        let newValue = value;

        if (field === "score" && scores[player].result === "lose" && newValue > 0) {
            newValue = -Math.abs(newValue);  // Ensure the score is negative
        }

        setScores((prev) => ({
            ...prev,
            [player]: { ...prev[player], [field]: newValue }
        }));
    };

    const handleResultChange = (player, result) => {
        setScores((prev) => {
            let score = prev[player].score;

            if (result === "lose" && score > 0) {
                score = -Math.abs(score); // Convert to negative if losing
            } else if (result === "win" && score < 0) {
                score = Math.abs(score); // Convert to positive if winning
            }

            return {
                ...prev,
                [player]: { ...prev[player], result, score }
            };
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        await addScore(new FormData(event.target)); // Submit the form data to the server

        setScores(initialScores); // Reset the form fields
        setShowModal(false); // Close the modal after submission
    };

    return (
        <>
            <button onClick={() => setShowModal(true)} className="btn btn-primary">
                Add Score
            </button>

            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-base-100 p-6 rounded-lg w-full max-w-md relative z-50">
                        <span
                            className="close text-xl leading-none hover:text-gray-300 cursor-pointer float-right"
                            onClick={() => setShowModal(false)}
                        >
                            &times;
                        </span>
                        <form onSubmit={handleSubmit} className="mt-4 flex flex-col items-center">
                            <input type="hidden" name="gameId" value={gameId} />

                            {["player1", "player2", "player3", "player4"].map((player, index) => (
                                <div key={index} className="mb-4 w-full flex items-center gap-4">
                                    {/* Avatar */}
                                    <div className="avatar placeholder">
                                        <div className="bg-neutral text-neutral-content w-12 rounded-md">
                                            <div className="text-xl">
                                                {data ? data[`${player}_name`].substring(0, 2) : player.charAt(0).toUpperCase()}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Win/Lose Radio */}
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            id={`${player}-win`}
                                            name={`${player}-result`}
                                            value="win"
                                            checked={scores[player].result === "win"}
                                            onChange={(e) => handleResultChange(player, e.target.value)}
                                            className="radio radio-success"
                                        />
                                        <label htmlFor={`${player}-win`} className="text-success">Win</label>

                                        <input
                                            type="radio"
                                            id={`${player}-lose`}
                                            name={`${player}-result`}
                                            value="lose"
                                            checked={scores[player].result === "lose"}
                                            onChange={(e) => handleResultChange(player, e.target.value)}
                                            className="radio radio-error"
                                        />
                                        <label htmlFor={`${player}-lose`} className="text-error">Lose</label>
                                    </div>

                                    {/* Score Input */}
                                    <input
                                        type="number"
                                        id={`${player}Score`}
                                        name={`${player}Score`}
                                        value={scores[player].score}
                                        onChange={(e) => handleScoreChange(player, "score", e.target.value)}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>
                            ))}

                            <button type="submit" className="btn btn-primary">
                                Submit Scores
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
