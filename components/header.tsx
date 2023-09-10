"use client";

import {RxCaretLeft, RxCaretRight} from 'react-icons/rx'
import { useRouter } from 'next/router';
import { twMerge } from "tailwind-merge";
import {HiHome} from "react-icons/hi"
import { BiSearch } from 'react-icons/bi';

import Button from './button';

interface HeaderProps{
    children:React.ReactNode;
    className?:string;
}
const Header:React.FC<HeaderProps>=({
    children,
    className
})=>{

    //const router=useRouter();
    const handlelogout=()=>{

   }
    return(
        <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6`, className)}>
            <div className="w-full mb-4 flex items-center justify-between">
                <div className="hidden md:flex gap-x-2 items-center">
                    <button /*onClick={()=>router.back()}*/ className='bg-black rounded-full flex items-center justify-center hover:opacity-75 transition'>
                        <RxCaretLeft className="text-white" size={35}/>
                    </button>
                    <button /*onClick={()=>router.forward()}*/ className='bg-black rounded-full flex items-center justify-center hover:opacity-75 transition'>
                        <RxCaretRight className="text-white" size={35}/>
                    </button>
                </div>
                <div className='flex md:hidden gap-x-2 items-center'>
                    <button className='rounded-full bg-white flex p-2 items-center justify-center hover:opacity-75 transition'>
                        <HiHome className="text-black" size={20}/>
                    </button>
                    <button className='rounded-full bg-white flex p-2 items-center justify-center hover:opacity-75 transition'>
                        <BiSearch className="text-black" size={20}/>
                    </button>
                </div>
                <div className='flex justify-between items-center gap-x-4'>
                    <>
                    <div>
                        <Button className='bg-transparent text-neutraal-300 font-medium'>Sign Up</Button>
                    </div>
                    <div>
                        <Button className='bg-white px-6 py-2'>Log In</Button>
                    </div>
                    </>
                </div>
            </div>
            {children}
        </div>
    )
}

export default Header;