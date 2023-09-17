"use client";

import {usePathname} from 'next/navigation'
import {useMemo} from 'react'
import {HiHome} from 'react-icons/hi'
import {BiSearch} from 'react-icons/bi'  

import Box from './box';
import SidebarItem from './sidebaritem';
import Library from './library';
import { Song } from '@/types';
import { twMerge } from 'tailwind-merge';
import usePlayer from '@/hooks/usePlayer';

interface SidebarProps{
    children:React.ReactNode;
    songs:Song[];
}
const Sidebar:React.FC<SidebarProps>=({
    children,
    songs
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

const Player=usePlayer();

    return(
        <div className={twMerge(`
        h-full
        flex`,Player.activeid && "h-[calc(100%-80px)]")}>
            <div className='hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2'>
            <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
            </div>
            <main className='h-full overflow-y-auto py-2 flex-1'>
                {children}
            </main>
        </div>
    )
}

export default Sidebar