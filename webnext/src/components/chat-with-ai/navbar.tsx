'use client'
import React, { useEffect, useState } from 'react'
import { ArrowLeft, UserPlus, Upload, ThumbsUp, ThumbsDown, X, AlertCircle, Copy, Check } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { FaRegUser } from "react-icons/fa";
import { Trash2 } from 'lucide-react';
import { FiLogOut } from "react-icons/fi";
import { FaQuestion } from "react-icons/fa6";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Loader2 } from "lucide-react"
import { SignOutWithSupabase } from '@/auth'
import Link from 'next/link';
import { publishShareData } from '@/api'
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { Input } from "@/components/ui/input"


const Navbar: React.FC<any> = (props) => {
    const { videoMeta, loader, user, chats, extractedText } = props
    const [deleteAlert, setDeleteAlert] = useState<boolean>(false)
    const [deleteLoader, setDeleteloader] = useState<boolean>(false)

    const [shareOpen, setShareOpen] = useState<boolean>(false)
    const [load, setload] = useState<boolean>(false)
    const [alertError, setAlertError] = useState<boolean>(false)
    const [copied, setCopied] = useState<boolean>(false);


    const handleCopy = () => {
        const textToCopy = `https://vidchat-ai.vercel.app/share/${videoMeta ? videoMeta.video_id : ''}`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    const addDataIntoShare = async () => {
        setload(true)
        const objectForProcess: any = {
            title: videoMeta.title,
            video_id: videoMeta.video_id,
            chat: JSON.stringify(chats),
            Date: videoMeta.created_at,
        }
        const result: any = await publishShareData(objectForProcess)
        if (result.success === true) {
            setload(false)
        } else {
            setload(false)
            setAlertError(true)
        }
    }

    useEffect(() => {
        if (shareOpen === false) {
            setload(false)
            setAlertError(false)

        }
    }, [shareOpen])



    return (
        <div className='w-full py-4 px-12  flex justify-between items-center'>
            <div className='flex items-center justify-center gap-7'>
                <Link href={'/explore'} className='border-[2px] rounded-md px-2 py-2 bg-transparent hover:bg-accent'>
                    <ArrowLeft className='h-5 w-6' color='white' />
                </Link>
                {videoMeta ?
                    <h1 className='text-2xl text-muted-foreground font-[500]'>{videoMeta.title}</h1>
                    :
                    <Skeleton className="h-10 w-[560px] rounded-md" />
                }
            </div>
            <div className='flex items-center justify-center gap-5'>
                <div className='flex items-center justify-center'>
                    <div className='flex justify-center items-center py-2.5 bg-transparent hover:bg-accent px-3.5 border rounded-l-xl'>
                        <ThumbsUp className='h-4 w-4' />
                    </div>
                    <div className='flex justify-center items-center py-2.5 bg-transparent hover:bg-accent px-3.5 border rounded-r-xl'>
                        <ThumbsDown className='h-4 w-4' />
                    </div>
                </div>
                <AlertDialog open={shareOpen} onOpenChange={setShareOpen}>
                    <AlertDialogTrigger asChild>
                        <Button onClick={(e) => {
                            if (extractedText.length !== 0) {
                                setShareOpen(true)
                                addDataIntoShare()
                            }
                        }} variant='outline' className='shadow-xl'>
                            <UserPlus className="mr-2 h-4 w-4" /> Share
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <div className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <X onClick={(e) => setShareOpen(false)} className="h-4 w-4 cursor-pointer" />
                            <span className="sr-only">Close</span>
                        </div>
                        <AlertDialogHeader>
                            <AlertDialogTitle className='text-2xl'>Share the chat !</AlertDialogTitle>
                            <AlertDialogDescription>
                                Copy the link and provide this to others , the conversation made till now will appear in this link.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        {load === true ? (
                            <div className='w-full py-10 flex justify-center items-center'>
                                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                            </div>
                        ) : alertError === true ? (
                            <Alert variant="destructive" className='my-5 mx-3'>
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    There is an Error in the server !
                                </AlertDescription>
                            </Alert>
                        ) : (
                            <div className='w-full flex justify-center items-center py-5 '>
                                <div className='flex gap-2 w-full items-center justify-center'>
                                    <Input
                                        defaultValue={`https://vidchat-ai.vercel.app/share/${videoMeta ? videoMeta.video_id : ''}`}
                                        className="h-[50px] w-[70%]"
                                        disabled={true}
                                    />
                                    <Button onClick={handleCopy} className='py-4 max-h-[60px] h-[50px] rounded-[24px] px-6'>
                                        {copied ? <Check className='mr-2 h-4 w-4' /> : <Copy className='mr-2 h-4 w-4' />}
                                        Copy Link</Button>
                                </div>
                            </div>
                        )}
                    </AlertDialogContent>
                </AlertDialog>
                <Button className='shadow-xl'>
                    <Upload className="mr-2 h-4 w-4" /> Export
                </Button>
                <div className='flex items-center justify-center gap-4'>
                    {loader ? (
                        <Skeleton className="h-12 w-12 rounded-full" />
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild><div className='px-3 py-3 rounded-full bg-[#43A8EE] flex justify-center items-center text-md text-white'>
                                <FaRegUser className='h-4 w-4' />
                            </div></PopoverTrigger>
                            <PopoverContent className='absolute px-0 pb-0 right-[-30px] border-[2px] flex flex-col  rounded-xl top-1'>
                                <div className='w-full px-4 flex gap-3 pb-4 border-b-[2px] items-center'>
                                    <div className='userIcon w-8 h-8 flex justify-center items-center'>
                                        J
                                    </div>
                                    <p className='tracking-wider'>{user ? user.email : ''}</p>
                                </div>
                                <AlertDialog open={deleteAlert} onOpenChange={setDeleteAlert}>
                                    <AlertDialogTrigger asChild>
                                        <div onClick={(e) => {
                                            setDeleteAlert(true)
                                        }} className='flex px-4 gap-3 hover:bg-destructive hover:text-white cursor-pointer py-4 text-sm items-center text-[#ef5656]'>
                                            <Trash2 className='h-5 w-5' />
                                            Delete My Account
                                        </div>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className='base:w-[90vw] w-[370px] base:rounded-[10px] pb-[28px] !pt-[23px]'>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Confirm to delete your account</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Are you sure you want to delete your account
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter className='base:flex-row tv:flex-row base:justify-end gap-2 pt-5'>
                                            <Button variant='outline' className='border-[2px] tracking-wide text-[0.8rem] font-[450] px-[10px] py-[2px] rounded-[4px] min-h-[10px] h-[35px]' onClick={(e) => setDeleteAlert(false)}>Cancel</Button>
                                            <Button disabled={deleteLoader} style={deleteLoader === true ? { opacity: 0.67 } : { opacity: 1 }}
                                                className={`${deleteLoader === true ? "op0" : "op1"} bg-[#e5484d] hover:bg-[#e5484d]/80 text-[0.8rem] tracking-wide font-[450] px-[10px] py-[2px] flex justify-center items-center gap-1 rounded-[4px] min-h-[10px] h-[35px]  border`} onClick={(e) => {
                                                    // deleteFunction()
                                                }}>
                                                {deleteLoader && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                Delete</Button>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                                <div className='flex px-4 gap-3  cursor-pointer py-4 text-sm items-center text-white'>
                                    <FaQuestion className='h-5 w-5' />
                                    How it Works ?
                                </div>

                                <div onClick={(e) => {
                                    e.preventDefault()
                                    SignOutWithSupabase()
                                }} className='flex hover:bg-accent cursor-pointer px-4 gap-3 py-4 border-t-[2px] items-center text-white'>
                                    <FiLogOut className='h-5 w-5' />
                                    Log out
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar