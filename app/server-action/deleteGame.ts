'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deleteGame(formData: FormData) {
    const gameId = formData.get('id')

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        console.error(`User is not authenticated to add a watch`)
        return
    }

    const { data, error } = await supabase
        .from('game')
        .delete()
        .match({ id: gameId, user_id: user.id })

    if (error) {
        console.error(`Error removing game: ${error.message}`)
        return
    }

    revalidatePath('/')

    return {message: 'Game removed successfully'}
}