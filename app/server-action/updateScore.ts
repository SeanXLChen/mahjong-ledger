'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateScore(formData: FormData) {
    const score = {
        scoreId: formData.get('scoreId'),
        player1Score: formData.get('player1Score'),
        player2Score: formData.get('player2Score'),
        player3Score: formData.get('player3Score'),
        player4Score: formData.get('player4Score'),
    }

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        console.error(`User is not authenticated to update a score`)
        return
    }

    const { data, error } = await supabase
        .from('scorer')
        .update({
            player1_score: score.player1Score,
            player2_score: score.player2Score,
            player3_score: score.player3Score,
            player4_score: score.player4Score,
        })
        .match({ id: score.scoreId })

    if (error) {
        console.error(`Error updating score: ${error.message}`)
        return
    }

    revalidatePath('/')
    return {message: 'Score updated successfully'}
}