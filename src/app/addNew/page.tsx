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
      console.log('data:', isbn, title, author, selectedTags,description);
      
    //  Send the form data, including tags, to the backend
      const response = await axios.post(API_ROUTES.SUBMIT_FORM, {
        isbn,
        title,
        author,
        tags: selectedTags, // Include selected tags
        description,
      });
    
      

      if (response.status === 200) {
        console.log('Form submitted successfully:', response.data);
        resetForm(); // Optionally reset the form
      } else {
        console.error('Error submitting form 1:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form 2:', error);
      if (axios.isAxiosError(error)) {
        // This is an Axios error
        console.error('Axios Error here:', error.message);
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
          type="number"
          id="isbn"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
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
      <hr />
      <label>
       Description:
         <textarea
         name="description"
         value={description}
         onChange={(e) => setDescription(e.target.value)}
         rows={5} // Adjust the number of rows as needed
          cols={50} // Adjust the number of columns as needed
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
      <button type="button" onClick={resetForm}>Reset form</button>
      <button type="submit" onClick={(e) => handleSubmit(e)}>Submit form</button>
    </form>
  );
}