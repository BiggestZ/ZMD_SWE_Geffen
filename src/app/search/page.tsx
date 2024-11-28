'use client';

import axios from "axios";
import { BookEntry } from "../components/book";
import TagTable from "../components/tagTableSearch";
import { useState, useEffect } from 'react';

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
        const response = await axios.get('http://localhost:3000/api/books', {params: { subtopic:selectedTags[0] }});

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
                    //(book.tagList).map((tag) => {})
                    // TODO : fix formatting for tags :(
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
                                
                            </div>
                        </li>
                    )
                })}
                </div>  
            </div>      
        </div>             
    );
};

/*<BookEntry key={book.isbn} 
    title={book.title} 
    author={book.author} 
    isbn={book.isbn} 
    bookDesc = {book.bookDesc} 
    tagsList={book.tagsList} 
    topicsList={[]} />
    
    <div className="w-full p-2 h-fit bg-slate-200 rounded-md border-solid border border-slate-500">
                <div className="flex space-x-4 text-base">
                    <div className="font-bold capitalize">{ title }</div>
                    <div className="grow text-right"><b>ISBN: </b>{ isbn }</div>
                </div> 
                <div className="capitalize">{ author }</div>
                <div className="text-sm p-2">{ bookDesc }</div>
                <div className="flex flex-wrap flex-row place-content-start p-1 gap-2">
                    {topicsArray}
                </div>
                <div className="flex flex-wrap flex-row place-content-start p-1 gap-2">
                    {tagsArray}
                </div>
            </div>
    
    */

export default SearchPage;