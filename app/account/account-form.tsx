'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'
// Import the new component
import Avatar from './avatar'
import Link from 'next/link'

export default function AccountForm({ user }: { user: User | null }) {
    const supabase = createClient()
    const [loading, setLoading] = useState(true)
    const [fullname, setFullname] = useState<string | null>(null)
    const [username, setUsername] = useState<string | null>(null)
    const [website, setWebsite] = useState<string | null>(null)
    const [avatar_url, setAvatarUrl] = useState<string | null>(null)

    const getProfile = useCallback(async () => {
        try {
            setLoading(true)

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
                setWebsite(data.website)
                setAvatarUrl(data.avatar_url)
            }
        } catch (error) {
            alert('Error loading user data!')
        } finally {
            setLoading(false)
        }
    }, [user, supabase])

    useEffect(() => {
        getProfile()
    }, [user, getProfile])

    async function updateProfile({
        username,
        website,
        avatar_url,
    }: {
        username: string | null
        fullname: string | null
        website: string | null
        avatar_url: string | null
    }) {
        try {
            setLoading(true)

            const { error } = await supabase.from('profiles').upsert({
                id: user?.id as string,
                full_name: fullname,
                username,
                website,
                avatar_url,
                updated_at: new Date().toISOString(),
            })
            if (error) throw error
            alert('Profile updated!')
        } catch (error) {
            alert('Error updating the data!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col w-11/12 md:w-1/2 mx-auto min-h-screen bg-gray-900 text-gray-300 relative">
            <div className="container mx-auto p-6 sm:p-12">
                <div className="flex mx-auto">
                    <div className="flex justify-between items-center gap-2 min-w-full">
                        <Link href="/">
                            <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                Back to App
                            </button>
                        </Link>
                        <h1 className="flex text-3xl md:text-6xl font-extrabold text-white mb-6">
                            My Profile
                        </h1>
                    </div>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div className="text-center mb-6">
                        <Avatar
                            uid={user?.id ?? null}
                            url={avatar_url}
                            size={150}
                            onUpload={(url) => {
                                setAvatarUrl(url)
                                updateProfile({ fullname, username, website, avatar_url: url })
                            }}
                        />
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                            <input
                                id="email"
                                type="text"
                                value={user?.email}
                                disabled
                                className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">Full Name</label>
                            <input
                                id="fullName"
                                type="text"
                                value={fullname || ''}
                                onChange={(e) => setFullname(e.target.value)}
                                className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-300">Username</label>
                            <input
                                id="username"
                                type="text"
                                value={username || ''}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="website" className="block text-sm font-medium text-gray-300">Website</label>
                            <input
                                id="website"
                                type="url"
                                value={website || ''}
                                onChange={(e) => setWebsite(e.target.value)}
                                className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mt-6 flex space-x-4">
                            <button
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition"
                                onClick={() => updateProfile({ fullname, username, website, avatar_url })}
                                disabled={loading}
                            >
                                {loading ? 'Loading ...' : 'Update'}
                            </button>
                            <form action="/auth/signout" method="post" className="w-full">
                                <button
                                    type="submit"
                                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition"
                                >
                                    Sign out
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}