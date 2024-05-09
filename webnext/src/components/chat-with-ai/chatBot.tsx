'use client'
import React, { useEffect, useState } from 'react'
import { CornerDownLeft, Mic, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from "@/components/ui/tooltip"

import { Progress } from "@/components/ui/progress"

const ChatBot: React.FC<any> = (props) => {
    const { extractedText } = props
    const [progress, setProgress] = useState<number>(10)
    useEffect(() => {
        if (extractedText.length === 0) {
            const intervalId = setInterval(() => {
                setProgress((prev) => prev + 5);
                if (extractedText.length !== 0) {
                    setProgress(100);
                    clearInterval(intervalId);
                }
            }, 600);
            return () => clearInterval(intervalId);
        }
    }, [])
    return (
        <div className='w-[50%] px-5 py-5 h-[100%] relative flex rounded-2xl bg-accent/60 justify-center items-center'>
            {extractedText.length === 0 && (
                <div className='w-full inset-0 z-50 bg-black/80 border rounded-2xl h-full absolute flex justify-center items-center top-0 right-0'>
                    <Progress value={progress} className="w-[60%]" />
                </div>
            )}
            <form
                className="absolute bottom-4 w-[95%] overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
            >
                <Label htmlFor="message" className="sr-only">
                    Message
                </Label>
                <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                />
                <div className="flex items-center p-3 pt-0">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" onClick={(e) => {
                                    e.preventDefault()
                                    console.log("MEOW")
                                }} size="icon">
                                    <Mic className="size-4" />
                                    <span className="sr-only">Use Microphone</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">Use Microphone</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <Button size="sm" onClick={(e) => {
                        e.preventDefault()
                        console.log("MEOWW")
                    }} className="ml-auto gap-1.5">
                        Send Message
                        <CornerDownLeft className="size-3.5" />
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ChatBot
