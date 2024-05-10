'use client';
import clientConnectionWithSupabase from '@/lib/supabase/client'
const googleAuth = async () => {
    const supabase = clientConnectionWithSupabase()
    console.log(location.origin)
    const URL = 'https://thevotum.com'
    // const URL ='http://localhost:3000'
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            scopes: "https://www.googleapis.com/auth/calendar",
            redirectTo: `${URL}/auth/callback`
        },
    })
    console.log(data)
    console.log(error)
}

export default googleAuth