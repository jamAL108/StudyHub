'use client';
import React, { useEffect, useState } from 'react'
import Navbar from '@/components/LandingNavbar'
import { useParams } from 'next/navigation'
import { GetVideoIntoText } from '@/api'
import { AlertForNoDataFound, ChatNavbar, DisplayChat, ChatBotComponent } from '@/components/chat-with-ai'
import { useToast } from "@/components/ui/use-toast"
import SessionNotFoundComp from '@/components/sessionNotFound'
import checkUserAuthClient from '@/auth/getUserSession'
import { useRouter } from 'next/navigation';
const Page = () => {

    const { toast } = useToast()
    const router = useRouter()
    const [extractedText, setExtractedText] = useState<string>('')
    const [videoMeta, setVideoMeta] = useState<any>(null)
    const [NoDataFound, setNoDataFound] = useState<boolean>(false)
    const params = useParams<{ url: string; }>()
    const [suggestedQuestion, setSuggestedQuestions] = useState<any>(null)
    const [loader, setLoader] = useState<boolean>(true)
    const [sessionNotFound, setSessionNotFound] = useState<boolean>(false)
    const [user, setUser] = useState<any>(null)


    useEffect(() => {
        getSession()
        const metaDataRetrieval: any = localStorage.getItem('VideoMeta')
        const parsedMetaData: any = JSON.parse(metaDataRetrieval)
        setVideoMeta(parsedMetaData)
        const StoredData: any = localStorage.getItem("studyHubData");
        const parsedData: any = JSON.parse(StoredData)
        if (parsedData === null) {
            getExtractedData()
        } else if (parsedData.url !== params.url) {
            setNoDataFound(true)
        } else {
            setExtractedText(parsedData.extractedText)
        }
    }, [])

    const getSession = async () => {
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

    const getExtractedData = async () => {
        toast({
            title: "This may Take 1-2 minutes",
            description: "Processing the Video , please wait",
        })
        const result = await GetVideoIntoText(params.url)
        if (result.success === true) {
            setExtractedText(result.text)
            const storageObject = {
                url: params.url,
                extractedText: result.text
            }
            console.log(extractedText)
            localStorage.setItem('studyHubData', JSON.stringify(storageObject))
        } else {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })
        }
    }

    if (NoDataFound) {
        return <AlertForNoDataFound />
    }

    return (
        <div className='flex-1 flex flex-col items-center overflow-hidden'>
            <ChatNavbar videoMeta={videoMeta} loader={loader} user={user} />
            <div className="w-[min(90vw,1400px)] h-[calc(100vh_-_5rem)]  max-h-[calc(100vh_-_5rem)] overflow-hidden flex justify-between">
                <DisplayChat videoMeta={videoMeta} extractedText={extractedText} suggestedQuestion={suggestedQuestion} setSuggestedQuestions={setSuggestedQuestions} user={user} />
                <ChatBotComponent extractedText={extractedText} videoMeta={videoMeta} user={user} />
            </div>
        </div>
    )
}

export default Page