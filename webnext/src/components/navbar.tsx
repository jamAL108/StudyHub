import React from 'react'
import Image from 'next/image'
const Navbar = () => {
    return (
        <div className='w-full border-b-[2px] flex justify-center'>
            <div className='w-[min(90vw,1400px)] py-1  px-[10px] flex justify-between items-center'>
                <Image src='/images/LOGO2.png' alt='qwerty' width={190} height={45} className='select-none' />
                <div className='w-full '>

                </div>
            </div>
        </div>
    )
}

export default Navbar