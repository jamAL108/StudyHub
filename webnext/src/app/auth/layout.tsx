import React from 'react'
import Image from 'next/image'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex-1 min-h-[100vh] h-[100vh] overflow-y-auto flex'>
            <div className='w-[42.5%] h-full border-l-[2px]  flex flex-col'>
                <Image src='/images/LOGO2.png' alt='qwerty' width={180} height={40} className='select-none' />
                <div className='w-full py-10 px-10 flex justify-center items-center'>
                   {children}
                </div>
            </div>
            <div className='w-[57.5%] h-full border-r-[2px] bg-accent/50 flex flex-col'>
                meow
            </div>
        </div>
    );
}