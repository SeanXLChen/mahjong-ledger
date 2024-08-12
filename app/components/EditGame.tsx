'use client'
import { useState } from "react"
import { updateGame } from "../server-action/updateGame"

type Game = {
    id: number,
    user_id: string,
    player1_name: string,
    player2_name: string,
    player3_name: string,
    player4_name: string,
    created_at: string,
    game_name: string
}

export default function EditGame({ game }: { game: Game }) {

    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        id: game.id,
        gameName: game.game_name,
        player1: game.player1_name,
        player2: game.player2_name,
        player3: game.player3_name,
        player4: game.player4_name
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission behavior
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const response = await updateGame(formData);

        setLoading(false);

        if (response && response.message) {
        } else {
            alert("An error occurred. Please try again.");
        }

        setShowModal(false); // Close the modal after submission
    };

    return (
        <div>
            <button onClick={() => setShowModal(true)} className="btn btn-sm btn-info">
                Edit
            </button>
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-[100]">
                    <div className="bg-base-100 p-6 rounded-lg w-full max-w-md relative">
                        <span
                            className="close text-xl leading-none hover:text-gray-300 cursor-pointer float-right"
                            onClick={() => setShowModal(false)}
                        >
                            &times;
                        </span>
                        <form onSubmit={handleSubmit} className="mt-4">
                            <input
                                type="hidden"
                                name="id"
                                value={game.id}
                            />

                            <div className="mb-4">
                                <label htmlFor="player1" className="block text-gray-700">Player 1</label>
                                <input
                                    type="text"
                                    id="player1"
                                    name="player1"
                                    value={formData.player1}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="player2" className="block text-gray-700">Player 2</label>
                                <input
                                    type="text"
                                    id="player2"
                                    name="player2"
                                    value={formData.player2}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="player3" className="block text-gray-700">Player 3</label>
                                <input
                                    type="text"
                                    id="player3"
                                    name="player3"
                                    value={formData.player3}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="player4" className="block text-gray-700">Player 4</label>
                                <input
                                    type="text"
                                    id="player4"
                                    name="player4"
                                    value={formData.player4}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="gameName" className="block text-gray-700">Game Name</label>
                                <input
                                    type="text"
                                    id="gameName"
                                    name="gameName"
                                    value={formData.gameName}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Update Game
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
