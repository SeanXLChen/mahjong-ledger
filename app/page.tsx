import React from 'react'
import { createClient } from '@/utils/supabase/server'
import GameForm from './components/GameForm'
import EditGame from './components/EditGame'
import { deleteGame } from './server-action/deleteGame'
import Link from 'next/link'

const GameListPage = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser();

    // console.log({ user })

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

    console.log({ games })

    return (
        <div className="relative z-10">
            {/* Game Form */}
            <div className="relative z-50">
                <GameForm />
            </div>

            {/* Game List */}
            <div className="relative z-0">
                {games.length !== 0 ? <></> : <div>You Don't have any game history</div>}
                {games?.map((game) => (
                    <div className='p-4 m-2 rounded-lg shadow-lg bg-base-300 '>
                        <div className='flex justify-between'>
                            <p className='w-1/3'></p>
                            <h1 className="text-2xl mb-2 text-center w-1/3">{game.game_name}</h1>
                            <p className="text-center w-1/3">{new Date(game.created_at).toLocaleString()}</p>

                        </div>

                        <div key={game.id} className="grid grid-cols-4 gap-4 place-items-center">

                            <section className='flex flex-col items-center'>
                                <div className="avatar placeholder">
                                    <div className="bg-neutral text-neutral-content w-16 rounded-full ring-primary ring-offset-base-100 ring ring-offset-2">
                                        <div className="text-xl">{game.player1_name.substring(0, 4)}</div>
                                    </div>
                                </div>
                            </section>

                            <section className='flex flex-col items-center'>
                                <div className="avatar placeholder">
                                    <div className="bg-neutral text-neutral-content w-16 rounded-full ring-primary ring-offset-base-100 ring ring-offset-2">
                                        <div className="text-xl">{game.player2_name.substring(0, 4)}</div>
                                    </div>
                                </div>
                            </section>

                            <section className='flex flex-col items-center'>
                                <div className="avatar placeholder">
                                    <div className="bg-neutral text-neutral-content w-16 rounded-full ring-primary ring-offset-base-100 ring ring-offset-2">
                                        <div className="text-xl">{game.player3_name.substring(0, 4)}</div>
                                    </div>
                                </div>
                            </section>

                            <section className='flex flex-col items-center'>
                                <div className="avatar placeholder">
                                    <div className="bg-neutral text-neutral-content w-16 rounded-full ring-primary ring-offset-base-100 ring ring-offset-2">
                                        <div className="text-xl">{game.player4_name.substring(0, 4)}</div>
                                    </div>
                                </div>
                            </section>

                            <div className='col-span-4 flex justify-center gap-2 mt-4'>
                                {/* View game detail */}
                                <Link href={`/game/${game.id}`} className="btn btn-success btn-sm">Track</Link>

                                {/* EditGame component */}
                                <EditGame game={game} />

                                {/* Delete button */}
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
                    </div>
                ))}

            </div>

        </div>
    )
}

export default GameListPage
