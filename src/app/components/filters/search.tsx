"use client"

import TagTable from "../tagTableSearch";
import axios from "axios";
import { useState,  useEffect } from 'react';
import { makeAxiosRequestConfig } from "../axiosrequest";

// thoughts
// figure out the function/api to call all subtopics and IDs at once DONE
// array.filter(tag)
// won't need to submit form? maybe?

const SearchBlock : React.FC = () => {

    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    let myFormData = new FormData();
    //myFormData.append(tags, selectedTags)

    return (
        <div className = "flex fixed left-0 h-full bg-slate-200 overscroll-contain w-48 grid grid-cols-1 justify-top">
            <form method="get">        
                <h2 className="grow-0">Search</h2>
                <TagTable />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};


export default SearchBlock;