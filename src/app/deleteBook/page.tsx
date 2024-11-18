'use client';

import { useState } from 'react';
import axios from 'axios';
import { API_ROUTES } from '../pages/api/deleteBook/route';

const DeleteBookPage = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('deleting book');

    if (!title.trim()) {
      setMessage('Please enter a valid book title.');
      return;
    }

    try {
      const response = await axios.delete('/api/deleteBook', {
        data: { title }, // Include the title in the request body
      });

      if (response.status === 200) {
        setMessage('Book deleted successfully!');
      } else {
        setMessage('Book not found or could not be deleted.');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      setMessage('An error occurred while deleting the book.');
    }

    // Clear input after submission
    setTitle('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h1>Delete Book</h1>
      <form onSubmit={handleDelete} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter book title or ISBN"
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}>
          Delete Book
        </button>
      </form>
      {message && <p style={{ marginTop: '10px', color: message.includes('successfully') ? 'green' : 'red' }}>{message}</p>}
    </div>
  );
};

export default DeleteBookPage;
