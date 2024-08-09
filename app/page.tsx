import React from 'react'
import { createClient } from '@/utils/supabase/server'
import GameForm from './components/GameForm'
import EditGame from './components/EditGame'
import { deleteGame } from './server-action/deleteGame'

const GameListPage = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser();

    console.log({user})

    // fetch games data from db
    const { data: games, error } = await supabase
        .from('game')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching games:', error.message)
        return <div>Error fetching games</div>
    }

    // console.log({ games })

    return (
        <>
            <div>
                <GameForm />
            </div>
            <div>
                {games?.map((game) => (
                    <><div key={game.id} className="mb-4 p-4 bg-gray-800 rounded-lg shadow">
                        <h1 className="text-2xl text-white mb-2">{game.game_name}</h1>
                        <h2 className="text-xl text-white mb-2">{game.player1_name} - {game.player2_name} - {game.player3_name} - {game.player4_name}</h2>
                        <p className="text-gray-400">created at: {new Date(game.created_at).toLocaleString()}</p>

                        <div className='flex gap-1'>
                            {/* // EditGame component */}
                            <EditGame game={game} />

                            {/* // delete button */}
                            <form action={deleteGame}>
                                <input type="hidden" name="id" value={game.id} />
                                <button
                                    type="submit"
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Delete
                                </button>
                            </form>
                        </div>

                    </div></>
                ))}
            </div>
        </>
    )
}

export default GameListPage
