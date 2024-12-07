'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ROUTES } from '../pages/api/editBook/route';
//import { Book } from "@/types";
import TagEditor  from "../components/tagEditor";
//import  handleTagChange from "../components/tagEditor";


const EditBooksPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editDetails, setEditDetails] = useState({});
  const [message, setMessage] = useState('');
  const [initialTags, setInitialTags] = useState<string[]>([]);
  const [loadingTags, setLoadingTags] = useState<boolean>(false);
  const [initialTitle, setInitialTitle] = useState('');
  

 
  const [updatedTags, setUpdatedTags] = useState<string[]>([]); // Initialize updatedTags as an empty array


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

    
        //setSearchResults(titles);
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
  //=======================================================
  useEffect(() => {
    const fetchTags = async () => {
      setLoadingTags(true);
      //console.log("selectedBook:", selectedBook.Title)
      try {
        const response = await axios.get(API_ROUTES.GET_TAG_FROM_BOOK, {
          params: { title: selectedBook.Title }
        });
        const data = response.data;
        console.log("HERE TAGS HEHEHE pls work:", data)
        console.log("pls work i wanna go to sleep:", data.books)
        if (Array.isArray(data.books)) {
          setInitialTags(data.books); // Assuming the API returns { tags: [] }
          //handleTagChange(data.books);
          //handleTagsUpdate(data.books);
        } else {
          console.error('Unexpected response format:', data);
        }
      } catch (error) {
        console.error('Error fetching tags:', error);
      } finally {
        setLoadingTags(false);
      }
    };

    if (selectedBook) {
      fetchTags();
      
      
    }
  }, [selectedBook]);

  


  //================================================================================================
  // Select a book to edit
  const handleSelectBook = (book: any) => {
    setSelectedBook(book);
    setInitialTitle(book.Title);
    setEditDetails(book); // Pre-fill with the book's current details
    
    
  };


  const handleTagsUpdate = async (newTags: string[]) => {
    console.log("newTags:", newTags)
    setUpdatedTags(newTags); // Update the updatedTags state
  };
   
    
  


  // Handle edits
  const handleEditChange = (field: string, value: string) => {
    setEditDetails((prev) => ({ ...prev, [field]: value }));
  };

  // Submit edits
  // const handleSave = async () => {
  //   setMessage('Saving changes...');
  //   try {
  //     editDetails.tags = updatedTags; // Add the updated tags to the editDetails object
  //     console.log("editDetails:", editDetails)
  //     const response = await axios.put(API_ROUTES.SAVE_BOOK, { ...editDetails });


  //     if (response.status === 200) {
  //       setMessage('Book updated successfully!');
        
  //       setSelectedBook(null);
  //       setSearchQuery('');
  //       setSearchResults([]);
  //     } else {
  //       setMessage('Failed to update the book.');
  //     }
  //     //=======================================================
      
  //   }
  //   catch (error) {
  //     console.error('Error updating book:', error);
  //     setMessage('An error occurred while updating the book.');
  //   }
  // };
  //================================================================================================
  type PayloadWithInitialTags = {
    editDetails: any;
    initialTags: string[];
    initialTitle: string;
};

type PayloadWithUpdatedTags = {
    editDetails: any;
    updatedTags: string[];
    initialTitle: string;
};

type Payload = PayloadWithInitialTags | PayloadWithUpdatedTags;
  //================================================================================================
  const handleSave = async () => {
    
    console.log('Form Data:', FormData);
    console.log('editDetails in editBook:', editDetails); // Ensure editDetails is defined in your component
    console.log('updatedTags in editBook::', updatedTags); // Ensure updatedTags is defined in your component
    console.log('initialTags in editBook::', initialTags); // Ensure selectedBook is defined in your component

   
    
    let payload: Payload;

  // Conditionally add updatedTags if it is not empty
  if (updatedTags && updatedTags.length > 0) {
      payload = {
      editDetails,
      updatedTags,
      initialTitle,
  };
  }
  else {
    payload = {
        editDetails,
        initialTags,
        initialTitle,
    };
}

  try {
      const response = await axios.post(API_ROUTES.SAVE_BOOK, payload);
      console.log('Response:', response.data);
  } catch (error) {
      console.error('Error saving book:', error);
  }



  };
  
  //================================================================================================

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
        key={`${book.ISBN}-${book.Title}`}
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
          <h2>Editing Book: {selectedBook.Title}</h2>
          <form  style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <label htmlFor="title" style={{ marginRight: '10px', fontSize: '16px' }}>Title:</label>
                <input
                    id="title"
                    type="text"
                    value={editDetails.title || selectedBook.Title}
                    onChange={(e) => handleEditChange('title', e.target.value)}
                    placeholder="Title"
                    style={{ padding: '10px', fontSize: '16px', width: '300px' }}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <label htmlFor="author" style={{ marginRight: '10px', fontSize: '16px' }}>Author:</label>
                <input
                    id="author"
                    type="text"
                    value={editDetails.author || selectedBook.Author}
                    onChange={(e) => handleEditChange('author', e.target.value)}
                    placeholder="Author"
                    style={{ padding: '10px', fontSize: '16px', width: '300px' }}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <label htmlFor="isbn" style={{ marginRight: '10px', fontSize: '16px' }}>ISBN:</label>
                <input
                    id="isbn"
                    type="text"
                    value={editDetails.isbn || selectedBook.ISBN}
                    onChange={(e) => handleEditChange('isbn', e.target.value)}
                    placeholder="ISBN"
                    pattern="\d{13}" // Regex pattern to allow only 13 digits
                    maxLength={13} // Limit input to 13 characters
                    style={{ padding: '10px', fontSize: '16px', width: '300px' }}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <label htmlFor="language" style={{ marginRight: '10px', fontSize: '16px' }}>Language:</label>
                <input
                    id="language"
                    type="text"
                    value={editDetails.language || selectedBook.Language}
                    onChange={(e) => handleEditChange('Language', e.target.value)}
                    placeholder="Language"
                    
                    style={{ padding: '10px', fontSize: '16px', width: '300px' }}
                />
            </div>

            
              <div>
                  {loadingTags ? (
                    <p>Loading tags...</p>
                  ) : (
                    <TagEditor
                      initialTags={initialTags} // Pass the current tags as the initialTags prop
                      onTagsUpdate={handleTagsUpdate} // Callback to update the tags
                    />
                  )}
                </div>

            {/* <input
              type="text"
              value={editDetails.description || selectedBook.Description}
              onChange={(e) => handleEditChange('description', e.target.value)}
              placeholder="description"
              style={{ padding: '10px', fontSize: '16px' }}
            /> */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <label htmlFor="description" style={{ marginRight: '10px', fontSize: '16px' }}>Description:</label>
            <textarea
                id="description"
                value={editDetails.description || selectedBook.Description}
                onChange={(e) => handleEditChange('description', e.target.value)}
                placeholder="description"
                style={{ padding: '10px', fontSize: '16px', width: '300px', height: '100px', resize: 'vertical' }} // Adjust width and height
            />
        </div>

          
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