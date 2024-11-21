"use client"

import TagTable from "../tagTableSearch";
import axios from "axios";
import { useState,  useEffect } from 'react';
import { makeAxiosRequestConfig } from "../axiosrequest";

// thoughts
// figure out the function/api to call all subtopics and IDs at once DONE
// array.filter(tag)
    // probably not, since books aren't being rendered within the form
// try: export the checked tags on submit, feed those to the search page.tsx getallbooks
// follow logic from there after
// won't need to submit form? maybe?

const SearchBlock : React.FC = () => {
    const [selectedTags,setSelectedTags] = useState<string[]>([]);
    const [resetTrigger, setResetTrigger] = useState(false);

    let myFormData = new FormData();

    const handleResetHandled = () => {
        setResetTrigger(false);
    };

    async function searchSubmit (e: React.FormEvent) {
        e.preventDefault();

        console.log(TagTable)

        /*selectedTags.map((tag) => {
            myFormData.append(tag, tag)
        })*/
    
        console.log("formdata", myFormData)
    }

    return (
        <div className = "flex fixed left-0 h-full bg-slate-200 overscroll-contain w-48 grid grid-cols-1 justify-top">
            <form onSubmit={searchSubmit}>        
                <h2 className="grow-0">Search</h2>
                <TagTable 
                    resetTrigger={resetTrigger}
                    onResetHandled={handleResetHandled}
                    onTagsSelected={setSelectedTags}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};


export default SearchBlock;