"use client";

import {usePathname} from 'next/navigation'
import {useMemo} from 'react'
import {HiHome} from 'react-icons/hi'
import {BiSearch} from 'react-icons/bi'  

import Box from './box';
import SidebarItem from './sidebaritem';

interface SidebarProps{
    children:React.ReactNode
}
const Sidebar:React.FC<SidebarProps>=({
    children
})=>{

const pathname=usePathname();
const routes=useMemo(()=>[
    {

        icons:HiHome,
        label:'Home',
        active:pathname!=='/search',
        href:'/',
    },
    {

        icons:BiSearch,
        label:'Search',
        active:pathname==='/search',
        href:'/search'

    }
],[pathname])

    return(
        <div className='flex h-full'>
            <div className='hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2'>
                <Box>
                    {routes.map((info)=>(
                        <SidebarItem key={info.label}{...info}/>
                    ))}
                </Box>

                <Box classname='overflow-y-auto h-full'>
                    Your library
                </Box>

            </div>
        </div>
    )
}

export default Sidebar