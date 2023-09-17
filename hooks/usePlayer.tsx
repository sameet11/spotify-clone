import { create } from "zustand";

interface PlayerStore{
    ids:string[];
    activeid?:string;
    setid:(id:string)=>void;
    setids:(ids:string[])=>void;
    reset:()=>void;
}

const usePlayer=create<PlayerStore>((set)=>({
    ids:[],
    activeid:undefined,
    setid:(id)=>set({activeid:id}),
    setids:(ids)=>set({ids:ids}),
    reset:()=>set({ids:[],activeid:undefined})
}))

export default usePlayer;