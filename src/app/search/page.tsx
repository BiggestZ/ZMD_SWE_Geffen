'use client';

import { Book } from "@/types";
import axios from "axios";
import { BookEntry } from "../components/book";
import TagTable from "../components/tagTableSearch";
import { useState, useEffect } from 'react';

const SearchPage = () => {

    //const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [tagsList, setTagsList] = useState([]);
    const [message, setMessage] = useState('');
    const [resetTrigger, setResetTrigger] = useState(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const handleResetHandled = () => {
        setResetTrigger(false);
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    // Search books
    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        // const response = await axios.get(API_ROUTES.EDIT_BOOK,{data: { searchQuery },});
        const response = await axios.get('http://localhost:3000/api/books', {
            params: { subtopic:selectedTags[0] },
        });
        
        if (response.data && response.data.filtered) {
            console.log("book response.data:", response.data)
            console.log("book response.data.books:", response.data.filtered)
            setSearchResults(response.data.filtered);
            //setTagsList(response.data.subtopicsList);

        } else {
            setSearchResults([]);
        }
        } catch (error) {
        console.error('Error searching books:', error);
        }
    };

    let filteredBooks = searchResults.map((book : any) => {
        let tagsArray : string[] = []
        let topicsArray : string[] = []
        return (
            <BookEntry key={book.ISBN} title={book.Title} author={book.Author} isbn={book.ISBN} bookDesc={book.Description} tagsList={tagsArray} topicsList={topicsArray}/>
        )})

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
                {searchResults/*.map((book : Book) => {
                    let tagsArray : string[] = []
                    let topicsArray : string[] = []
                    return (
                        <BookEntry key={book.ISBN} title={book.Title} author={book.Author} isbn={book.ISBN} bookDesc={book.Description} tagsList={tagsArray} topicsList={topicsArray}/>
                    }
                })}*/}
                </div>  
            </div>      
        </div>             
    );
};

export default SearchPage;