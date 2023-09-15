
import { useState,useEffect } from "react";

const useDebounce=(value: T ,delay?:number):T=>{
    const [debounevalue,setdebouncevalue]=useState<T>(value);

    useEffect(()=>{
        const timer=setTimeout(() => {
            setdebouncevalue(value);
        }, delay||500);

        return ()=>{
            clearTimeout(timer);
        }
    },[value,delay])
    return debounevalue;
}

export default useDebounce;