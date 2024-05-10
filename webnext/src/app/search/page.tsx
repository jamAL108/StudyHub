'use client';
import React, { useEffect, useState } from 'react'
import Navbar from "@/components/navbar";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { YtVideoComponent } from '@/components/search'
import { getVideosBasedOnQuery } from '@/api'
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
const Page = () => {
    const { toast } = useToast()
    const [ytQuery, setYtQuery] = useState<string>('')
    const [YTdata, setYTdata] = useState<any>(null)
    const [apiGoing, setApiGoing] = useState<boolean>(false)
    const [showScrollbar, setShowScrollbar] = useState(false);


    const handleYTSearch = async (e: any) => {
        e.preventDefault();
        setApiGoing(true)
        // const temp: any = localStorage.getItem('dat')
        // const neee: any = JSON.parse(temp)
        // console.log(neee[0])
        // setYTdata(neee)
        // setApiGoing(false)
        const result: any = await getVideosBasedOnQuery(ytQuery)
        console.log(result)
        if (result.success === true) {
            setYTdata(result.data)
            localStorage.setItem('dat', JSON.stringify(result.data))
            setApiGoing(false)
        } else {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: <ToastAction onClick={handleYTSearch} altText="Try again">Try again</ToastAction>,
            })
            setApiGoing(false)
        }
    };

    return (
        <div className='flex-1 flex flex-col items-center overflow-hidden'>
            <Navbar />
            <div className="w-[min(90vw,1400px)] h-[calc(100vh_-_5.5rem)]  max-h-[calc(100vh_-_5.5rem)]  overflow-hidden flex">
                <Card className='shadow-none w-full !border-none mt-2 bg-inherit'>
                    <CardHeader>
                        <CardTitle>Chat with AI with Youtube video</CardTitle>
                        <CardDescription>Provide your query what you wnat to explore , Select any video and chat with our AI regarding the video.</CardDescription>
                    </CardHeader>
                    <CardContent className='flex justify-between mt-5'>
                        <Tabs defaultValue="account" className="w-[max(35%,400px)] ">
                            <TabsList className="grid w-[70%] grid-cols-2">
                                <TabsTrigger value="account">Explore</TabsTrigger>
                                <TabsTrigger value="password">Quick Link</TabsTrigger>
                            </TabsList>
                            <TabsContent value="account" className='border-none'>
                                <Card className='border-none'>
                                    <CardContent className="space-y-2 mt-6">
                                        <div className="grid w-full items-center gap-4 mb-6">
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="name">Query</Label>
                                                <Textarea
                                                    onChange={(e) => setYtQuery(e.target.value)}
                                                    value={ytQuery}
                                                    id="content"
                                                    placeholder="I have exams tommorow and i want to study some computer network topics..."
                                                    className="min-h-[9.5rem]"
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className='flex justify-end items-center gap-4'>
                                        <Button className='px-[24px]' variant="outline">Cancel</Button>
                                        <Button disabled={apiGoing} className='px-[24px]' onClick={handleYTSearch}>
                                            {apiGoing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Search</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                            <TabsContent value="password">
                                <Card className='border-none'>
                                    <CardContent className="space-y-2 mt-6  mb-6">
                                        <div className="space-y-1">
                                            <Label htmlFor="current">video URL</Label>
                                            <Input id="current" placeholder='youtube video URL' type="password" />
                                        </div>
                                    </CardContent>
                                    <CardFooter className='flex justify-end items-center'>
                                        <Button>Search</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                        </Tabs>
                        {YTdata !== null && (
                            <div className='w-[max(45%,600px)]  flex flex-col'>
                                <fieldset
                                    onMouseEnter={() => setShowScrollbar(true)}
                                    onMouseLeave={() => setShowScrollbar(false)}
                                    className={`w-full max-h-[calc(100vh_-_150px)] scrollarea ${showScrollbar ? 'show-scrollbar' : ''} grid gap-6 rounded-lg border p-4`}>
                                    <legend className="-ml-1 px-2 pb-[10px] text-sm font-medium">Results</legend>
                                    {
                                        YTdata.length === 0 ? (
                                            <div
                                                className="flex flex-1 items-center justify-center"
                                            >
                                                <div className="flex flex-col items-center gap-1 text-center">
                                                    <h3 className="text-2xl font-bold tracking-tight">
                                                        You have no products
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        You can start selling as soon as you add a product.
                                                    </p>
                                                    <Button className="mt-4">Enter URL manually</Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col  pb-[10px] mb-[50px]">
                                                {YTdata.map((item: any, idx: number) => (
                                                    <YtVideoComponent item={item} key={idx} />
                                                ))}
                                            </div>
                                        )
                                    }
                                </fieldset>
                            </div>
                        )}
                    </CardContent>
                </Card >
            </div >
        </div >
    )
}

export default Page