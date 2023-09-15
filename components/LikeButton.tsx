"use client";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";


interface LikeButtonProps{
    songId:string;
}

const LikeButton:React.FC<LikeButtonProps>=({
    songId,
})=>{

    const router=useRouter();
    const {supabaseClient}=useSessionContext();
    const AuthModal=useAuthModal();
    const {user}=useUser();

    const [isliked,setisliked]=useState(false);

    useEffect(()=>{
        if(!user?.id){
            return;
        }

        const fetchdata=async()=>{
            const {data,error}= await supabaseClient.from('liked_songs').select('*').eq('user_id',user.id).eq('song_id',songId).single();
            if(!error&&data){

                setisliked(true);
            }
        
        }

        fetchdata();

    },[songId,user?.id,supabaseClient])

    const Icon= isliked?AiFillHeart:AiOutlineHeart;

    const handleclick= async()=>{

        if(!user){
            AuthModal.onOpen();
        }

        if(isliked){
            const {error}= await supabaseClient.from('liked_songs').delete().eq('user_id',user?.id).eq('song_id',songId)
            if(error){
                toast.error(error.message);
            }
            else{
                setisliked(false);
            }
        }
        else{
            const {error}= await supabaseClient.from('liked_songs').insert({
                'song_id':songId,
                'user_id':user?.id,
            })
            if(error){
                toast.error(error.message);
            }
            else{
                setisliked(true);
                toast.success('Liked!');
            }
        }

        router.refresh();
    }
    return(
        <button  onClick={handleclick} className="
        hover:opacity-75
        transition">
            <Icon color={isliked?'#22c55e':'white'} size={25}/>
        </button>
    )

}
export default LikeButton;