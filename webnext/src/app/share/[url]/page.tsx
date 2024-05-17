'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Separator } from "@/components/ui/separator"
import { getSharedChatData } from '@/api'
import { Skeleton } from "@/components/ui/skeleton"
import { formatDateFunction } from '@/utils'
const SharedView = () => {
    const params = useParams<{ url: string; }>()
    const [loader, setLoader] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)
    const [data, setData] = useState<any>(null)
    const [chats, setChats] = useState<any>([])

    useEffect(() => {
        getData()
        async function getData() {
            const result: any = await getSharedChatData(params.url)
            if (result.success === true && result.data.length !== 0) {
                setLoader(false)
                setData(result.data[0])
                const temp = JSON.parse(JSON.parse(result.data[0].chat))
                console.log(temp[0])
                setChats(temp)
            } else {
                // setLoader(false)
                setError(true)
            }
        }
    }, [params])


    return (
        <div className='flex-1 h-[100vh] flex justify-center'>
            <div className='w-[min(90vw,750px)] h-full overflow-y-auto py-11 flex flex-col'>
                {loader === false ? (
                    <>
                        <div className='w-full flex flex-col gap-4'>
                            <h1 className='text-4xl font-[590] tracking-normal'>{data.title}</h1>
                            <p className='text-muted-foreground text-md font-[500]'>{formatDateFunction(data.Date)}</p>
                        </div>
                        <Separator className='w-full h-[1px] bg-white my-6' />
                        <div className='w-full flex flex-col gap-3 px-4 py-3'>
                            {chats && chats.length !== 0
                                ? chats.map((chat: any, index: number) => (
                                    <p key={index} className={`${chat.role === "user" ? "justify-end" : "justify-start"} w-full flex items-center`}>
                                        <span className={`${chat.role === "user" ? "bg-primary" : "bg-accent"} text-sm max-w-[75%] px-3 py-3 rounded-md`} style={{ textAlign: "left" }}>{chat.content}</span>
                                    </p>
                                ))
                                : ""}
                        </div>
                    </>
                ) : (
                    <>
                        <div className='w-full flex flex-col gap-4'>
                            <Skeleton className='base:w-[95%] bl:w-[430px] h-10' />
                            <Skeleton className='w-[150px] h-4' />
                        </div>
                        <Skeleton className='w-full h-[2px]  my-6' />
                        <div className='w-full h-full flex flex-col gap-6 px-4 py-2'>
                            <div className='w-full flex justify-end items-center'>
                                <Skeleton className='base:w-[85%] bl:w-[360px] h-8' />
                            </div>
                            <div className='w-full h-[240px] flex items-center'>
                                <Skeleton className='base:w-[85%] bl:w-[380px] h-full' />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default SharedView
