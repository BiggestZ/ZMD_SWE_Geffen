'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ROUTES } from '../pages/api/editBook/route';
import { Book } from "@/types";


const EditBooksPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editDetails, setEditDetails] = useState({});
  const [message, setMessage] = useState('');

  // Search books
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Searching for books...');
    console.log('Getting book:', searchQuery);
    try {
      // const response = await axios.get(API_ROUTES.EDIT_BOOK,{data: { searchQuery },});
      const response = await axios.get(API_ROUTES.EDIT_BOOK, {
        params: { title:searchQuery },
      });
      
      if (response.data && response.data.books) {
        console.log("book response.data:", response.data)
        console.log("book response.data.books:", response.data.books)
        // setSearchResults(response.data.books);
        setSearchResults(response.data.books);
        setMessage('good');

        //error but still works?
        // console.log("results.title: ", searchResults[0].Title)

      } else {
        setSearchResults([]);
        setMessage('No books found.');
      }
    } catch (error) {
      console.error('Error searching books:', error);
      setMessage('An error occurred while searching for books.');
    }
  };

  // Select a book to edit
  const handleSelectBook = (book: any) => {
    setSelectedBook(book);
    setEditDetails(book); // Pre-fill with the book's current details
  };

  // Handle edits
  const handleEditChange = (field: string, value: string) => {
    setEditDetails((prev) => ({ ...prev, [field]: value }));
  };

  // Submit edits
  const handleSave = async () => {
    setMessage('Saving changes...');
    try {

      const response = await axios.put(API_ROUTES.SAVE_BOOK, { ...editDetails });

      if (response.status === 200) {
        setMessage('Book updated successfully!');
        setSelectedBook(null);
        setSearchQuery('');
        setSearchResults([]);
      } else {
        setMessage('Failed to update the book.');
      }
    } catch (error) {
      console.error('Error updating book:', error);
      setMessage('An error occurred while updating the book.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h1>Edit Books</h1>
      
      {!selectedBook ? (
        <>
          <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, author, or ISBN"
              style={{ padding: '10px', fontSize: '16px' }}
            />
            <button type="submit" style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}>
              Search
            </button>
          </form>
          
          {message && <p style={{ marginTop: '10px', color: 'red' }}>{message}</p>}
          
          <ul style={{ marginTop: '20px', listStyle: 'none', padding: 0 }}>
  {searchResults.length > 0 ? (
    searchResults.map((book: any) => (

      <li
        //key={book.isbn || book.title} // Fallback to title if id is missing
        key={`${book.isbn}-${book.title}`}
        //FIXME
        onClick={() => handleSelectBook(book)}
        style={{
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          margin: '5px 0',
          cursor: 'pointer',
        }}
        
      >
        
        {/* {searchResults[0]?.Title ? `${searchResults[0]?.Title} by ${book.author || 'Unknown'}` : 'Error: Unknown Title'} */}
        {book.Title ? `${book.Title} by ${book.Author || 'Unknown'}` : 'Error: Unknown Title'}
        {/* //FIXME */}

      </li>
      
        

    ))
    
  ) : (
    <p style={{ marginTop: '10px' }}>No books found. Try a different search query.</p>
  )}
</ul>

        </>
      ) : (
        <div>
          <h2>Editing Book: {searchResults[0].Title}</h2>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
            <input
              type="text"
              value={[editDetails].title || searchResults[0].Title}
              onChange={(e) => handleEditChange('title', e.target.value)}
              placeholder="Title"
              style={{ padding: '10px', fontSize: '16px' }}
            />
            <input
              type="text"
              value={editDetails.author || searchResults[0].Author}
              onChange={(e) => handleEditChange('author', e.target.value)}
              placeholder="Author"
              style={{ padding: '10px', fontSize: '16px' }}
            />
            <input
              type="text"
              value={editDetails.isbn || searchResults[0].ISBN}
              onChange={(e) => handleEditChange('isbn', e.target.value)}
              placeholder="ISBN"
              style={{ padding: '10px', fontSize: '16px' }}
            />
          
            <button
              type="button"
              onClick={handleSave}
              style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setSelectedBook(null)}
              style={{ padding: '10px', fontSize: '16px', cursor: 'pointer', backgroundColor: 'lightgray' }}
            >
              Cancel
            </button>
          </form>
          {message && <p style={{ marginTop: '10px', color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}
        </div>
      )}
    </div>
  );
};

export default EditBooksPage;
