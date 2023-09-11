
import { User } from "@supabase/auth-helpers-nextjs"

import { Subscription, UserDetails } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useSessionContext,useUser as useSupaUser } from "@supabase/auth-helpers-react";

type UserContextType={
    accessToken:string|null;
    user:User|null;
    userdetails:UserDetails|null;
    isloading:boolean;
    subscription:Subscription|null;
}

export const UserContext=createContext<UserContextType|undefined>(undefined);

export interface Props{
    [propname:string]:any;
}

export const MyUserContextProvider=(props:Props)=>{
    const {
        session,
        isLoading:isLoadingUser,
        supabaseClient:supabase,

    } =useSessionContext();
    const user=useSupaUser();
    const accessToken=session?.access_token??null;
    const [isLoadingData,setisLoadingData]=useState(false);
    const [userdetails,setuserdetails]=useState<UserDetails|null>(null);
    const [subscription,setsubscription]=useState<Subscription|null>(null);

    const getuserdetials=()=>supabase.from('users').select('*').single();
    const getsubscription=()=>supabase.from('subscriptions').select('*,prices(*,products(*))').in('status',['trialing','active']).single();

    useEffect(()=>{
        if(user&&!isLoadingData&&!userdetails&&!subscription){
            setisLoadingData(true);

            Promise.allSettled([getuserdetials(),getsubscription()]).then((results)=>{
                const userdetailspromise=results[0];
                const subscriptionpromise=results[1];

                if(userdetailspromise.status==="fulfilled"){
                    setuserdetails(userdetailspromise.value.data as UserDetails);
                }
                if(subscriptionpromise.status==="fulfilled"){
                    setsubscription(subscriptionpromise.value.data as Subscription);
                }
                setisLoadingData(false);
            })
        }
        else if (!user&&!isLoadingUser&&!isLoadingData){
            setuserdetails(null);
            setsubscription(null);
        }
    },[user,isLoadingUser])

    const value={
        accessToken,
        user,
        userdetails,
        isloading:isLoadingUser||isLoadingData,
        subscription
    }
    return <UserContext.Provider value={value} {...props}/>
}

export const useUser=()=>{
    const context=useContext(UserContext);
    if(context===undefined){
        throw new Error(`useUser must be used within a MyUserContextProvider.`);
    }
    return context;
}