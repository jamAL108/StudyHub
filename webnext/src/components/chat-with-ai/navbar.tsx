import React from 'react'
import { ArrowLeft, UserPlus, Upload, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { Skeleton } from "@/components/ui/skeleton"
const Navbar: React.FC<any> = (props) => {
    const { videoMeta } = props
    return (
        <div className='w-full py-4 px-12  flex justify-between items-center'>
            <div className='flex items-center justify-center gap-7'>
                <Link href={'/search'} className='border-[2px] rounded-md px-2 py-2 bg-transparent hover:bg-accent'>
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
                        <ThumbsDown className='h-4 w-4' />
                    </div>
                    <div className='flex justify-center items-center py-2.5 bg-transparent hover:bg-accent px-3.5 border rounded-r-xl'>
                        <ThumbsUp className='h-4 w-4' />
                    </div>
                </div>
                <Button variant='outline' className='shadow-xl'>
                    <UserPlus className="mr-2 h-4 w-4" /> Share
                </Button>
                <Button className='shadow-xl'>
                    <Upload className="mr-2 h-4 w-4" /> Export
                </Button>
            </div>
        </div>
    )
}

export default Navbar