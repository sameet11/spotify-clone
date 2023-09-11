"use client";

import { MyUserContextProvider } from "@/hooks/useUser";
import { Children } from "react";

interface UserProviderProps{
    children:React.ReactNode;
}

const UserProvider:React.FC<UserProviderProps>=({
    children
})=>{
    return(
        <MyUserContextProvider>
            {Children}
        </MyUserContextProvider>
    )

}

export default UserProvider;