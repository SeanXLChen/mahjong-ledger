import BasicAvatar from './BasicAvatar'
import { createClient } from '@/utils/supabase/server'

export default async function AvatarWrap() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null; // Return nothing if user is not logged in
  }

  return <BasicAvatar user={user} />
}