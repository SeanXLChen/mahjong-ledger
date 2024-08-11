'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function removeScore(formData: FormData) {
    const scoreId = formData.get('scoreId');

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        console.error(`User is not authenticated to remove a score`)
        return
    }

    const { data, error } = await supabase
        .from('scorer')
        .delete()
        .match({ id: scoreId })

    if (error) {
        console.error(`Error removing score: ${error.message}`)
        return
    }

    revalidatePath('/')
    return {message: 'Score removed successfully'}
}
