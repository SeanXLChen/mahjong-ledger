'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

type ScoreData = {
    gameId : number,
    player1Score : number,
    player2Score : number,
    player3Score : number,
    player4Score : number,
}

export async function addScore(formData: FormData) {
    const score = {
        gameId: formData.get('gameId'),
        player1Score: formData.get('player1Score'),
        player2Score: formData.get('player2Score'),
        player3Score: formData.get('player3Score'),
        player4Score: formData.get('player4Score'),
    }

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        console.error(`User is not authenticated to add a watch`)
        return
    }

    const { data, error } = await supabase
        .from('scorer')
        .insert([
            { game_id: score.gameId,
                player1_score: score.player1Score,
                player2_score: score.player2Score,
                player3_score: score.player3Score,
                player4_score: score.player4Score,}
        ])

    if (error) {
        console.error(`Error creating score: ${error.message}`)
        return
    }

    revalidatePath('/')
    return {message: 'Score added successfully'}
}