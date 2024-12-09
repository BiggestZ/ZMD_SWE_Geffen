'use client';

import axios from "axios";
import { useState } from 'react';
import { API_ROUTES } from "../pages/api/search/route";
import { BookEntry } from "../components/book";
import TopicSelector from "../components/searchTopicSelector";

const SearchPage = () => {

    const [searchResults, setSearchResults] = useState([]);
    const [selectedTag, setSelectedTag] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');

    // Search books
    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.get(API_ROUTES.SEARCH_BY_NAME, {params: { title: searchQuery }});
            setSearchResults(response.data.books);

        } catch (error) {
            console.error('Error searching by title: ', error)
        }
    }

    const handleTagsSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.get(API_ROUTES.SEARCH_BY_TAGS, {params: { subtopic:selectedTags[0] }});
        
            setSearchResults(response.data.filtered);

        } catch (error) {
            console.error('Error searching by tags:', error);
        }
    };

    const handleTopicSelectorSubmit = (savedTag: string) => {
        console.log('Received saved tags:', savedTag);
        setSelectedTag(savedTag)
      };

    return (
        <div className="flex space-x-10 static left-0 h-full">
            <div className = "flex bg-slate-200 overscroll-contain w-52 justify-top grid grid-auto-rows auto-rows-min">
                <h2 className="flex-wrap">Search by Title</h2>
                        <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="search"
                                style={{ padding: '5px', fontSize: '16px' }}
                            />
                            <button type="submit" style={{ backgroundColor: '#075985', padding: '10px', fontSize: '16px', cursor: 'pointer', color: 'white'}}>
                                Search
                            </button>
                        </form>
                        <form onSubmit={handleSearch}>        
                    
                    <h2 className="grow-0">Search by Topic</h2>
                        <TopicSelector onSubmit={handleTopicSelectorSubmit} />
                    <button type="submit" style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}>Search</button>
                </form>
            </div>
            <div className = "flex w-36" />
            <div className = "flex w-fit">
                <div className="right-0 p-5 gap-5 space-y-2">
                    {searchResults.map((book : any) => {
                        return(
                            <BookEntry key={book.isbn} title={book.title} author={book.author} isbn={book.isbn} bookDesc={book.bookDesc} tagsList={book.tagsList}/>
                        )
                    })}
                </div>  
            </div>      
        </div>             
    );
};


export default SearchPage;