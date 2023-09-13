"use client";

import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";

import { useEffect, useState } from "react"

const ModalProviders=()=>{
    const[ismounted,setismounted]=useState(false);

    useEffect(()=>{
        setismounted(true);
    },[])

    if(!ismounted){
        return null;
    }

    return(
        <>
        <AuthModal/>
        <UploadModal/>
        </>
    );
}

export default ModalProviders;