import React from 'react'
import { createClient } from '@/utils/supabase/server'
import GameForm from './components/GameForm'
import EditGame from './components/EditGame'
import { deleteGame } from './server-action/deleteGame'
import Link from 'next/link'
import AvatarWrap from './components/AvatarWrap'

const GameListPage = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch games data from the database
    const { data: games, error } = await supabase
        .from('game')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching games:', error.message)
        return <div>Error fetching games</div>
    }

    return (
        <>

        <div className="relative">
            {/* Game Form */}
            <div className="mb-4">
                <GameForm />
            </div>

            {/* Game List */}
            <div>
                {games.length === 0 ? (
                    <div>You don't have any game history</div>
                ) : (
                    <div className="space-y-2">
                        {games.map((game) => (
                            <div
                                key={game.id}
                                className="flex items-center justify-between p-4 rounded-lg shadow-lg bg-base-300"
                            >
                                {/* Game Name */}
                                <h1 className="text-xl font-semibold w-1/6 truncate">
                                    {game.game_name}
                                </h1>

                                {/* Players' Information */}
                                <div className="space-x-2 w-2/6 hidden lg:flex lg:gap-1">
                                    {["player1_name", "player2_name", "player3_name", "player4_name"].map(
                                        (player, index) => (
                                            <div
                                                key={index}
                                                className="flex flex-col items-center"
                                            >
                                                <div className="avatar placeholder">
                                                    <div className="bg-neutral text-neutral-content w-12 h-12 rounded-md ring-neutral ring-offset-base-100 ring ring-offset-2 flex items-center justify-center">
                                                        <span className="text-lg">
                                                            {game[player].substring(0, 2)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>

                                {/* Game Creation Time */}
                                <p className="text-center text-sm w-1/6 hidden sm:block">
                                    {new Date(game.created_at).toLocaleString()}
                                </p>

                                {/* Action Buttons */}
                                <div className="flex space-x-2 w-1/6 justify-end">
                                    <Link
                                        href={`/game/${game.id}`}
                                        className="btn btn-success btn-sm"
                                    >
                                        Track
                                    </Link>

                                    <EditGame game={game} />

                                    <form action={deleteGame}>
                                        <input type="hidden" name="id" value={game.id} />
                                        <button
                                            type="submit"
                                            className="btn btn-sm btn-error"
                                        >
                                            Delete
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
        </>
    )
}

export default GameListPage
