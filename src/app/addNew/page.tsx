'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import TagTable from "../components/tagTable";
import { API_ROUTES } from '../pages/api/submitForm/route';
import TopicSelector from '../components/TopicSelector';

export default function Home() {
  const [resetTrigger, setResetTrigger] = useState(false);
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [language, setLanguage] = useState('');

  const [isMounted, setIsMounted] = useState(false); // This will ensure the component only renders client-side

  // Ensure client-side-only behavior for hydration fix
  useEffect(() => {
    setIsMounted(true); // Set to true when component is mounted on the client
  }, []);

  // If the component is not mounted yet, return null or loading state
  if (!isMounted) {
    return null; // Or a loading spinner could be used here instead
  }

  //======
  const handleTopicSelectorSubmit = (savedTags: [string, string[]][]) => {
    console.log('Received saved tags:', savedTags);
    setSelectedTags(savedTags)
  };
  //======

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      console.log('sending data', isbn);
      console.log('data:', isbn, title, author, selectedTags,description, language);
      
    //  Send the form data, including tags, to the backend
      const response = await axios.post(API_ROUTES.SUBMIT_FORM, {
        isbn,
        title,
        author,
        tags: selectedTags, // Include selected tags
        description,
        language,
      });
    
      

      if (response.status === 200) {
        console.log('Form submitted successfully:', response.data);
        resetForm(); // Optionally reset the form
        alert("book has been added successfully");
      } else {
        console.error('Error submitting form 1:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form 2:', error);
      alert("ERROR book has NOT been saved");
      if (axios.isAxiosError(error)) {
        // This is an Axios error
        console.error('Axios Error here:', error.message);
        alert("ERROR book has NOT been saved");
      }
    
      
    }
  };

  const resetForm = () => {
    setResetTrigger(true);
    setIsbn('');
    setTitle('');
    setAuthor('');
    setDescription('');
    setSelectedTags([]); // Clear selected tags
  };

  const handleResetHandled = () => {
    setResetTrigger(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add New Test</h1>
      <label>
       ISBN:
       <input
        type="text"
        id="isbn"
        value={isbn}
        pattern="\d{13}"
        onChange={(e) => {
        const value = e.target.value;
        if (/^\d{0,13}$/.test(value)) {
        setIsbn(value);
        }
        }}
        />
      </label>
      <label>
        Title:
        <input
          type="text"
          title="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Author:
        <input
          type="text"
          name="name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </label>
      <label>
        language:
        <input
          type="text"
          name="name"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
      </label>
      <hr />
      <label style={{ display: 'block', marginBottom: '10px' }}>
  Description:
  <textarea
    name="description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    rows={5} // Adjust the number of rows as needed
    cols={50} // Adjust the number of columns as needed
    style={{
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px',
      fontFamily: 'Arial, sans-serif',
      boxSizing: 'border-box',
      marginTop: '5px'
    }}
  />
</label>
      

      <hr />
      <hr />

      {/* <TagTable
        resetTrigger={resetTrigger}
        onResetHandled={handleResetHandled}
        onTagsSelected={setSelectedTags} // Pass callback to receive selected tags
      /> */}
      <TopicSelector 
      onSubmit={handleTopicSelectorSubmit}
      />

      <hr />
      <button type="button" onClick={resetForm}
      style={{
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: 'blue',
        color: 'white',
        border: 'white',
        cursor: 'pointer',
      }}
        >Reset form</button>
      <button type="submit" onClick={(e) => handleSubmit(e)}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: 'blue',
          color: 'white',
          border: 'white',
          cursor: 'pointer',
        }}
        
        >Submit form</button>
    </form>
  );
}