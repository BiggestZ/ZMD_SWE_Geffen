'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import TagTable from "../components/tagTable";

export default function Home() {
  const [resetTrigger, setResetTrigger] = useState(false);
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      console.log('sending data', isbn);
      console.log('data:', isbn, title, author, selectedTags);
      // Send the form data, including tags, to the backend
      const response = await axios.post('/api/submitForm', {
        isbn,
        title,
        author,
        tags: selectedTags, // Include selected tags
      });

      if (response.status === 200) {
        console.log('Form submitted successfully:', response.data);
        resetForm(); // Optionally reset the form
      } else {
        console.error('Error submitting form:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const resetForm = () => {
    setResetTrigger(true);
    setIsbn('');
    setTitle('');
    setAuthor('');
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

      <TagTable
        resetTrigger={resetTrigger}
        onResetHandled={handleResetHandled}
        onTagsSelected={setSelectedTags} // Pass callback to receive selected tags
      />

      <hr />
      <button type="button" onClick={resetForm}>Reset form</button>
      <button type="submit">Submit form</button>
    </form>
  );
}