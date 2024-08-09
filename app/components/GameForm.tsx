import { addGame } from "../server-action/addGame";

export default function GameForm() {

    return (
        <form action={addGame} className="mb-6">
            <div className="p-2 mx-2">
                <div className="flex gap-1">
                    <div className="mb-4">
                        <label htmlFor="player1" className="block mb-2">player1 name</label>
                        <input
                            type="text"
                            // placeholder="Game Name"
                            id="player1"
                            name="player1"
                            className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="player2" className="block mb-2">player2 name</label>
                        <input
                            type="text"
                            id="player2"
                            name="player2"
                            className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="player3" className="block mb-2">player3 name</label>
                        <input
                            type="text"
                            id="player3"
                            name="player3"
                            className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="player4" className="block mb-2">player4 name</label>
                        <input
                            type="text"
                            id="player4"
                            name="player4"
                            className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
                            required
                        />
                    </div>

                </div>
                <div className="flex justify-between">
                    <div className="mb-4">
                        <label htmlFor="gameName" className="block mb-2">Game Name</label>
                        <input
                            type="text"
                            // placeholder="Game Name"
                            id="gameName"
                            name="gameName"
                            className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Start Game
                    </button>
                </div>
            </div>

        </form>
    )
}