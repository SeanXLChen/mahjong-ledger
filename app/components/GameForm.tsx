import { addGame } from "../server-action/addGame"

export default function GameForm(){
    return (
        <form action={addGame} className="mb-6">
            <div className="mb-4">
                <label htmlFor="gameName" className="block text-white mb-2">Game Name</label>
                <input 
                    type="text"
                    id="gameName"
                    name="gameName"
                    className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="player1" className="block text-white mb-2">player1 name</label>
                <input 
                    type="text"
                    id="player1"
                    name="player1"
                    className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="player2" className="block text-white mb-2">player2 name</label>
                <input 
                    type="text"
                    id="player2"
                    name="player2"
                    className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="player3" className="block text-white mb-2">player3 name</label>
                <input 
                    type="text"
                    id="player3"
                    name="player3"
                    className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="player4" className="block text-white mb-2">player4 name</label>
                <input 
                    type="text"
                    id="player4"
                    name="player4"
                    className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
                    required
                />
            </div>
            <button type="submit" className="bg-gray-600 hover:bg-gray-300 text-white hover:text-black font-bold py-2 px-4 rounded">
                Start Game
            </button>
        </form>     
    )
}