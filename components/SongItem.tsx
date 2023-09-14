"use client";


import useLoadImage from "@/hooks/useLoadImage";

import PlayButton from "./playbutton";

import { Song } from "@/types";

import Image from "next/image";

interface SongItemProps{
    onClick:(id:string)=>void;
    data:Song;
}


const SongItem:React.FC<SongItemProps>=({
    onClick,
    data
})=>{

    const image_path=useLoadImage(data);

    return(
        <div onClick={()=>onClick(data.id)} className="
        relative
        group
        flex
        flex-col
        items-center
        justify-center
        rounded-md
        overflow-hidden
        gap-x-4
        bg-neutral-400/5
        cursor-pointer
        hover:bg-neutral-400/10
        transition
        p-3">

            <div className="
            h-full
            w-full
            relative
            aspect-square
            rounded-md
            overflow-hidden">

                <Image
                className="object-cover"
                src={image_path||'/images/liked.png'}
                fill
                alt='image'/>

            </div>

            <div className="flex flex-col gap-y-1 items-center w-full pt-4">
                <p className="w-full font-semibold truncate">{data.title}</p>
                <p className="text-neutral-400 text-sm pb-4 w-full truncate ">By {data.author}</p>
            </div>

            <div className="absolute bottom-24 right-5">
                <PlayButton/>
            </div>

        </div>
    )

}

export default SongItem;