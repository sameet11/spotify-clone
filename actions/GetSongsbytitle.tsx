import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import GetSongs from "./GetSongs";

const GetSongsByTitle= async (title:string):Promise<Song[]>=>{

    if(!title){
        const allsongs= await GetSongs();
        return allsongs;
    }

    const supabase=createServerComponentClient({
        cookies:cookies
    })

    const {data,error}= await supabase.from('songs').select('*').ilike('title',`%${title}%`).order('created_at',{ascending:false})

    if(error){
        console.log(error);
    }
    else{
        return (data as any) || [];
    }
}

export default GetSongsByTitle;