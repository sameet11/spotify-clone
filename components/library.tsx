'use client';

import {TbPlaylist} from 'react-icons/tb'
import {AiOutlinePlus} from 'react-icons/ai'

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import useUploadModal from '@/hooks/useUploadModel';


import { Song } from '@/types';

import MediaItem from './MediaItem';

interface LibraryProps{
    songs:Song[];
}

const Library:React.FC<LibraryProps>=({
    songs,
})=>{

    const AuthModal=useAuthModal();
    const UploadModal=useUploadModal();
    const {user}=useUser();

    const onclick=()=>{
        if(!user){
            return AuthModal.onOpen();
        }

        UploadModal.onOpen();
    }
    return(
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-5 pt-4">
                <div className="inline-flex items-center gap-x-2">
                    <TbPlaylist text-neutral-400 size={26}/>
                    <p className='text-md font-medium text-neutral-400'>Your Library</p>
                </div>
                <AiOutlinePlus onClick={onclick} className="text-neutral-400 hover:text-white transition cursor-pointer"  size={26}/>
            </div>
            <div className='flex flex-col gap-y-2 mt-4 px-3'>
                {songs.map((song)=>{
                    return(
                        <MediaItem 
                        onClick={()=>{}}
                        key={song.id}
                        data={song}/>
                    )
                })}
            </div>
        </div>
    )
}

export default Library;