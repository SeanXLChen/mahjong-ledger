'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'
// Import the new component
import AvatarBase from './AvatarBase'
import Link from 'next/link'

export default function BasicAvatar({ user }: { user: User | null }) {
    const supabase = createClient()
    const [fullname, setFullname] = useState<string | null>(null)
    const [username, setUsername] = useState<string | null>(null)
    const [avatar_url, setAvatarUrl] = useState<string | null>(null)

    const getProfile = useCallback(async () => {
        try {

            const { data, error, status } = await supabase
                .from('profiles')
                .select(`full_name, username, website, avatar_url`)
                .eq('id', user?.id)
                .single()

            if (error && status !== 406) {
                console.log(error)
                throw error
            }

            if (data) {
                setFullname(data.full_name)
                setUsername(data.username)
                setAvatarUrl(data.avatar_url)
            }
        } catch (error) {
            alert('Error loading user data!')
        } 
    }, [user, supabase])

    useEffect(() => {
        getProfile()
    }, [user, getProfile])

    return (

                        <>
                        <section className="">

                        <AvatarBase
                            uid={user?.id ?? null}
                            url={avatar_url}
                            size={50}
                        />
                        </section>
                        </>
                    
    )
}
