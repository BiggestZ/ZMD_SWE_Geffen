"use client"

import TagTable from "../tagTableSearch";
import { useState,  useEffect, useMemo } from 'react';
import { useAppDispatch,useAppSelector } from "./hooks";
import { setSearch } from "./store";

// thoughts
// figure out the function/api to call all subtopics and IDs at once DONE
// array.filter(tag)
    // probably not, since books aren't being rendered within the form
// try: export the checked tags on submit, feed those to the search page.tsx getallbooks
// follow logic from there after
// won't need to submit form? maybe?

const SearchBlock : React.FC = () => {

    const dispatch = useAppDispatch();
    const search = useAppSelector((state) => state.filterSearch.SubtopicName)

    const [selectedTags,setSelectedTags] = useState<string[]>([]);
    const [resetTrigger, setResetTrigger] = useState(false);

    const handleResetHandled = () => {
        setResetTrigger(false);
    };

    /*
    async function searchSubmit (e: React.FormEvent) {
        e.preventDefault();

        console.log(TagTable)

        /*selectedTags.map((tag) => {
            myFormData.append(tag, tag)
        })
    
        console.log("formdata", myFormData)
    }*/

    return (
        <div className = "flex fixed left-0 h-full bg-slate-200 overscroll-contain w-48 grid grid-cols-1 justify-top">
            <form>        
                <h2 className="grow-0">Search</h2>
                <TagTable 
                    resetTrigger={resetTrigger}
                    onResetHandled={handleResetHandled}
                    onTagsSelected={(e) => dispatch(setSearch(e[0]))}
                />
            </form>
        </div>
    );
};


export default SearchBlock;