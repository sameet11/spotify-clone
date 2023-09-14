import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Song } from "@/types";

const getSongsByUserId = async (): Promise<Song> => {
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  const {data:sessiondata,error:sessionerror}=await supabase.auth.getSession();

  if(sessionerror){
    console.log(sessionerror.message);
    return [];
  }

  const {data, error}= await supabase.from('songs').select('*').eq('user_id',sessiondata.session?.user.id).order('created_at',{ascending:false});

  if(error){
    console.log(error.message)
  }

  return (data as any ) || [];
};

export default getSongsByUserId;