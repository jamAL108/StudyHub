'use client'
import React, { useEffect, useState } from 'react'
import checkUserAuthClient from '@/auth/getUserSession'
import { useRouter } from 'next/navigation'
import SessionNotFoundComp from '@/components/sessionNotFound'
import SkeletonComp from './Skeleton'
import Navbar from '@/components/userNavbar'
const Home = () => {
    const router = useRouter()
    const [loader, setLoader] = useState<boolean>(true)
    const [sessionNotFound, setSessionNotFound] = useState<boolean>(false)
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        getAllInvoicefunciton()
    }, [])

    const getAllInvoicefunciton = async () => {
        const res: any = await checkUserAuthClient()
        if (res.error !== null) {
            router.push('/')
            return
        }
        if (res.data.session === null) {
            setLoader(false)
            setSessionNotFound(true)
            return
        }
        setUser(res.data.session.user)
        setLoader(false)
    }

    if (sessionNotFound) {
        return <SessionNotFoundComp />
    }

    return (
        <div className='flex-1 flex flex-col items-center overflow-hidden'>
            <Navbar loader={loader} user={user} />
            {loader ? (
                <SkeletonComp />
            ) : (
                <div className="w-[min(90vw,1400px)] h-[calc(100vh_-_5rem)] max-h-[calc(100vh_-_5rem)] overflow-hidden flex justify-between">
                    wqdefgrthtjj
                </div>
            )}
        </div>
    )
}

export default Home