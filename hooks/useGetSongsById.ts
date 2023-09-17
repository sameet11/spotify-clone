import { Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast";

const useGetSongsById=(id?:string)=>{

    const [isLoading,setisLoading]=useState(false);
    const [song,setSong]=useState<Song|undefined>(undefined);
    const {supabaseClient}=useSessionContext();

    useEffect(()=>{
        if(!id){
            return;
        }

        setisLoading(true);
        const fetchSong=async()=>{

            const {data,error}=await supabaseClient.from('songs').select('*').eq('id',id).single();

            if(error){
                toast.error(error.message);
                setisLoading(false);
                return;
            }

            setSong(data as Song);
            setisLoading(false);

        }

        fetchSong();
    },[supabaseClient,id])

    return useMemo(()=>({
        isLoading,
        song
    }),[isLoading,song])
}

export default useGetSongsById;