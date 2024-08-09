'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addGame(formData: FormData) {
    const player1 = formData.get('player1')
    const player2 = formData.get('player2')
    const player3 = formData.get('player3')
    const player4 = formData.get('player4')

    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    const user = session?.user

    if (!user) {
        console.error(`User is not authenticated to add a watch`)
        return
    }

    const { data, error } = await supabase
        .from('game')
        .insert([
            { player1_name: player1,
                player2_name: player2,
                player3_name: player3,
                player4_name: player4, 
                user_id: user.id }
        ])

    if (error) {
        console.error(`Error creating game: ${error.message}`)
        return
    }

    revalidatePath('/watche-list')

    return {message: 'Game added successfully'}
}