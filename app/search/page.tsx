
import SearchContent from "./SearchContent";

import GetSongsByTitle from "@/actions/GetSongsbytitle";

import SearchInput from "@/components/SearchInput";
import Header from "@/components/header";


interface SearchProps {
    searchParams: { title: string }
  };

const Search=async({searchParams}:SearchProps)=>{

    const songs= await GetSongsByTitle(searchParams.title);
    return(
        <div className="
        ng-neutral-500
        rounded-lg
        h-full
        w-full
        overflow-hidden
        overflow-y-auto
        ">
            <Header className="bg-gradient-to-neutral-900 from-neutral-900">
                <div className="mb-2 flex flex-col gap-y-6">

                    <h1 className="text-white text-3xl font-semibold">Search</h1>
                    <SearchInput/>
                </div>
            </Header>
            <SearchContent songs={songs}/>
        </div>
    )
     
}
export default Search;