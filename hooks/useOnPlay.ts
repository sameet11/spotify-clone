import { Song } from "@/types"
import usePlayer from "./usePlayer"
import { useUser } from "./useUser";
import useAuthModal from "./useAuthModal";

const useOnPlay=(song:Song[])=>{
    const player=usePlayer();
    const {user}=useUser();
    const authmodal=useAuthModal();

    const onPlay=(id:string)=>{
        if(!user){
            return authmodal.onOpen();
        }

        player.setid(id);
        player.setids(song.map((song)=>song.id))
    }

    return onPlay;
}

export default useOnPlay;