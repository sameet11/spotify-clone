import useUploadModal from "@/hooks/useUploadModel";
import Modal from "./Modal"
import Input from "./input";
import Button from "./button";

import {useState} from "react"
import { useForm,FieldValues,SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast/headless";
import { useUser } from "@/hooks/useUser";

import uniqid from "uniqid"
import { SupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const UploadModal=()=>{
    
    const [isLoading,setIsloading]=useState(false);
    const {register,handleSubmit,reset}=useForm<FieldValues>({
        defaultValues:{
            author:'',
            title:'',
            song:null,
            image:null
        }
    })
    const UploadModal=useUploadModal();
    const {user}=useUser();
    const router=useRouter();

    const onsubmit:SubmitHandler<FieldValues>= async(values)=>{

        try{

            setIsloading(true);

            const imagefile=values.image?.[0];
            const songfile=values.image?.[0];

            if(!imagefile||!songfile||!user){
                toast.error('missing fields')
                return;
            }

            const uniqueid=uniqid();

            const {
                data:songdata,
                error:songerror,
            }= await SupabaseClient.storage.from('songs').Upload(`song-${values.title}-${uniqueid}`,songfile,{
                cacheControl:'3600',
                upsert:false,
            });

            if(songerror){
                setIsloading(false);
                return toast.error('failed song upload')
            }

            const {
                data:imagedata,
                error:imageerror,
            }= await SupabaseClient.storage.from('images').Upload(`image-${values.title}-${uniqueid}`,imagefile,{
                cacheControl:'3600',
                upsert:false,
            });

            if(imageerror){
                setIsloading(false);
                return toast.error(`failed to upload image`);
            }

            const{error:supabaseerror}= await SupabaseClient.from('songs').insert({
                user_id:user.id,
                title:values.title,
                author:values.author,
                image_path:imagedata.path,
                song_path:songdata.path,
            })

            if(supabaseerror){
                setIsloading(false);
                return toast.error(supabaseerror.message)
            }
            router.refresh();
            setIsloading(false);
            UploadModal.onClose();
            toast.success('Song Created!')
            reset();
        }
        catch(error){
            toast.error('something went wrong')
        }finally{

            setIsloading(false);
        }

    }

    const onChange=(open:boolean)=>{
        if(!open){
            reset();
            UploadModal.onClose();
        }
    }



    return(
        <Modal title="Add a Song"
        description="Upload a mp3 file"
        isOpen={UploadModal.isOpen}
        onChange={()=>{onChange}}>
            <form
            className="flex flex-col gap-y-4" 
            onSubmit={handleSubmit(onsubmit)}>
                <Input 
                id="title"
                disabled={isLoading}
                {...register('title',{required:true})}
                placeholder="Song title"/>

                <Input 
                id="author"
                disabled={isLoading}
                {...register('author',{required:true})}
                placeholder="Song author"/>

                <div>
                    <div className="pb-1">
                        Select a song file
                    </div>
                <Input 
                id="Song"
                type="file"
                disabled={isLoading}
                {...register('Song',{required:true})}
                accept=".mp3"
                placeholder="Song author"/>
                </div>

                <div>
                    <div className="pb-1">
                        Select an Image
                    </div>
                <Input 
                id="image"
                type="file"
                disabled={isLoading}
                {...register('image',{required:true})}
                accept="image/*"
                placeholder="Song author"/>
                </div>

                <Button>Create</Button>
            </form>
        </Modal>
    )
}

export default UploadModal;