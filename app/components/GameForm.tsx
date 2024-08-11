'use client'
import { useState } from "react";
import { addGame } from "../server-action/addGame";

export default function GameForm() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <div className="flex justify-center">
                <button onClick={() => setShowModal(true)} className="btn btn-primary">
                    Add Game
                </button>
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center px-4">
                    <div className="modal-content bg-gray-900 p-6 rounded-lg w-full max-w-md">
                        <span
                            className="close text-white text-xl leading-none hover:text-gray-300 cursor-pointer float-right"
                            onClick={() => setShowModal(false)}
                        >
                            &times;
                        </span>
                        <form action={addGame} className="mt-4 flex flex-col items-center">
                            <div className="p-2 mx-2 flex justify-items-center">
                                <div className="flex mb-4 w-full">
                                    <input
                                        type="text"
                                        placeholder="Game Name"
                                        id="gameName"
                                        name="gameName"
                                        className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 justify-items-center">
                                {["player1", "player2", "player3", "player4"].map((player, index) => (
                                    <div key={index} className="flex mb-4 w-full">
                                        <input
                                            type="text"
                                            placeholder={`${player.charAt(0).toUpperCase() + player.slice(1)} name`}
                                            id={player}
                                            name={player}
                                            className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
                                            required
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="w-full">
                                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Start Game
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}