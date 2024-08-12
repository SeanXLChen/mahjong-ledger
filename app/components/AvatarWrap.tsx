import BasicAvatar from './BasicAvatar'
import { createClient } from '@/utils/supabase/server'

export default async function AvatarWrap() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return <BasicAvatar user={user} />
}