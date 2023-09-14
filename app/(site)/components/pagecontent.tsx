"use client";

import { Song } from "@/types";
import SongItem from "@/components/SongItem";

interface PageContentProps{
    songs:Song[];
}

const PageContent:React.FC<PageContentProps>=({
    songs
})=>{

    if(songs.length===0){
        return(
            <div className="mt-4 text-neutral-400">
                No Song Available
            </div>
        )
    }
    return(
        <div className="
        grid
        grid-cols-2
        sm:grid-cols-3
        lg:grid-cols-4
        2xl:grid-cols-8
        xl:grid-cols-5
        gap-x-4
        mt-4
        ">
            {songs.map((item)=>{
                return(
                    <SongItem key={item.id}
                    onClick={()=>{}}
                    data={item}/>
                )
            })}
        </div>
    )
}

export default PageContent;