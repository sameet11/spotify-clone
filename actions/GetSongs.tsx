import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const GetSongs= async ():Promise<Song[]>=>{
    const supabase=createServerComponentClient({
        cookies:cookies
    })

    const {data,error}= await supabase.from('songs').select('*').order('created_at',{ascending:false})

    if(error){
        console.log(error);
    }
    else{
        return (data as any) || [];
    }
}

export default GetSongs;