'use client';
import React, { useEffect , useState } from 'react'
import Navbar from '@/components/navbar'
import { useParams } from 'next/navigation'

const Page = () => {
    const [extractedText , setExtractedText] = useState<string>('')
    const params = useParams<{ url: string; }>()
    useEffect(() => {
        const StoredData:any = localStorage.getItem("studyHubData");
        const parsedData:any = JSON.parse(StoredData)
        if(parsedData===null){
            getExtractedData()
        }else if(parsedData.url!=params.url) {
            getExtractedData()
        }else{
            setExtractedText(parsedData.extractedText)
        }
    }, [])

    const getExtractedData = () =>{

    }
    return (
        <div className='flex-1 flex flex-col items-center overflow-hidden'>
            <div className="w-[min(90vw,1400px)]  max-h-[100vh]  overflow-hidden flex">

            </div>
        </div>
    )
}

export default Page