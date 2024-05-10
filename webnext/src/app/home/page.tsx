'use client'
import React, { useEffect, useState } from 'react'
import checkUserAuthClient from '@/auth/getUserSession'
import { useRouter } from 'next/navigation'
import SessionNotFoundComp from '@/components/sessionNotFound'
import SkeletonComp from './Skeleton'
const Home = () => {
    const router = useRouter()
    const [loader, setLoader] = useState<boolean>(true)
    const [sessionNotFound, setSessionNotFound] = useState<boolean>(false)

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
        setLoader(false)
    }

    if (sessionNotFound) {
        return <SessionNotFoundComp />
    }

    if (loader) {
        return <SkeletonComp />
    }

    return (
        <div>Home</div>
    )
}

export default Home