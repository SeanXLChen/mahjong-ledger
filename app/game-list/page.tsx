import React from 'react'
import { createClient } from '@/utils/supabase/server'

const GameListPage = async () => {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    const user = session?.user

    // console.log({user})

    // fetch games data from db
    const { data: games, error } = await supabase
        .from('game')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

    console.log({ games })

    return (
        <>
            <div>
                {games?.map((game) => (
                    <div key={game.id} className="mb-4 p-4 bg-gray-800 rounded-lg shadow">
                        <h2 className="text-xl text-white mb-2">{game.player1_name} - {game.player2_name} - {game.player3_name} - {game.player4_name}</h2>
                        <p className="text-gray-400">created at: {new Date(game.created_at).toLocaleString()}</p>


                    </div>
                ))}
            </div>
        </>
            )
}

            export default GameListPage