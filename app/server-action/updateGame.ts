'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateGame(formData: FormData) {
    const gameId = formData.get('id')
    const gameName = formData.get('gameName')
    const player1 = formData.get('player1')
    const player2 = formData.get('player2')
    const player3 = formData.get('player3')
    const player4 = formData.get('player4')

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        console.error(`User is not authenticated to add a watch`)
        return
    }

    const { data, error } = await supabase
        .from('game')
        .update([
            { player1_name: player1,
                player2_name: player2,
                player3_name: player3,
                player4_name: player4, 
                game_name: gameName,
                user_id: user.id }
        ]).match({ id: gameId, user_id: user.id })

    if (error) {
        console.error(`Error updating game: ${error.message}`)
        return
    }

    revalidatePath('/')

    return {message: 'Game updated successfully'}
}