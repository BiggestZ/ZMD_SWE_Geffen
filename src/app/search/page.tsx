'use client';

import axios from "axios";
import { BookEntry } from "../components/book";
import TagTable from "../components/tagTableSearch";
import { useState } from 'react';
import { API_ROUTES } from "../pages/api/search/route";

const SearchPage = () => {

    const [searchResults, setSearchResults] = useState([]);
    const [resetTrigger, setResetTrigger] = useState(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const handleResetHandled = () => {
        setResetTrigger(false);
    };

    // Search books
    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        const response = await axios.get(API_ROUTES.SEARCH, {params: { subtopic:selectedTags[0] }});

        console.log("book response.data:", response.data)
        console.log("book response.data.books:", response.data.filtered)
    
        setSearchResults(response.data.filtered);

        } catch (error) {
        console.error('Error searching books:', error);
        }
    };

    return (
        <div className="flex space-x-10">
            <div className = "flex fixed left-0 h-full bg-slate-200 overscroll-contain w-48 grid grid-cols-1 justify-top">
                <form onSubmit={handleSearch}>        
                    <h2 className="grow-0">Search</h2>
                    <TagTable 
                        resetTrigger={resetTrigger}
                        onResetHandled={handleResetHandled}
                        onTagsSelected={setSelectedTags}
                    />
                    <button type="submit" style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}>Search</button>
                </form>
            </div>
            <div className = "flex w-48" />
            <div className = "flex w-fit">
                <div className="right-0 p-5 gap-5 space-y-2">
                {searchResults.map((book : any) => {
                    let tags = (book.tagsList).map((tag : any) => {
                        return(
                            <div style = {{
                                padding: '8px',
                                background: '#444',
                                margin: '5px 0',
                                flex: 'flex-auto',
                                color: 'white'
                            }} key={tag}>
                            {tag}
                            </div>
                        )
                    })
                    
                    return(
                        <li key={book.isbn}>
                            <div style={{
                                padding: '10px',
                                border: '1px solid #aaa',
                                borderRadius: '5px',
                                background: '#ddd',
                                margin: '5px 0'}}>

                                <div style={{ fontWeight: 'bold', }}>{book.title}</div>
                                <div style={{ fontWeight: 'bold', direction: 'rtl', textAlign: 'justify'}}>ISBN: {book.isbn}</div>
                                <div style={{ padding: '2px' }}>{ book.author }</div>
                                <div style={{ fontSize: 'small', padding: '5px' }}>{book.bookDesc}</div>
                                {tags}
                            </div>
                        </li>
                    )
                })}
                </div>  
            </div>      
        </div>             
    );
};


export default SearchPage;