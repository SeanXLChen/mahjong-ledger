import { addScore } from "../server-action/addScore";

export default function ScoreForm() {
    return (
        <form action={addScore} className="mb-6">
            <div className="mb-4">
                <label htmlFor="gameId" className="block text-white mb-2">Game ID</label>
                <input 
                    type="number"
                    id="gameId"
                    name="gameId"
                    className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="player1Score" className="block text-white mb-2">Player 1 Score</label>
                <input 
                    type="number"
                    id="player1Score"
                    name="player1Score"
                    className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="player2Score" className="block text-white mb-2">Player 2 Score</label>
                <input 
                    type="number"
                    id="player2Score"
                    name="player2Score"
                    className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="player3Score" className="block text-white mb-2">Player 3 Score</label>
                <input 
                    type="number"
                    id="player3Score"
                    name="player3Score"
                    className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="player4Score" className="block text-white mb-2">Player 4 Score</label>
                <input 
                    type="number"
                    id="player4Score"
                    name="player4Score"
                    className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
                    required
                />
            </div>
            <button type="submit" className="bg-gray-600 hover:bg-gray-300 text-white hover:text-black font-bold py-2 px-4 rounded">
                Submit Scores
            </button>
        </form>
    );
}
