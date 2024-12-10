'use client';

import { useState } from 'react';
import axios from 'axios';
import { API_ROUTES } from '../pages/api/AEDTags/route';


const TagActionsPage = () => {
  const [tag, setTag] = useState('');
  const [topic, setTopic] = useState(''); // Only used for adding tags
  const [message, setMessage] = useState('');

  const handleAddTag = async (e) => {
    e.preventDefault();
    setMessage('Adding tag...');

    if (!tag.trim() || !topic.trim()) {
      setMessage('Please enter a valid tag and topic.');
      return;
    }

    try {
      const response = await axios.post(API_ROUTES.ADD_TAG, {
        data: { tag, topic },
      });

      if (response.status === 200) {
        setMessage(`Tag "${tag}" added successfully under topic "${topic}"!`);
      } else {
        setMessage('Failed to add tag.');
      }
    } catch (error) {
      console.error('Error adding tag:', error);
      setMessage('An error occurred while adding the tag.');
    }

    setTag('');
    setTopic('');
  };

  const handleEditTag = async (e) => {
    e.preventDefault();
    setMessage('Editing tag...');

    if (!tag.trim()) {
      setMessage('Please enter a valid tag.');
      return;
    }

    try {
      const response = await axios.put(API_ROUTES.EDIT_TAG, {
        data: { tag, newTag: tag, newTopic: topic }, // Optional topic
      });

      if (response.status === 200) {
        setMessage(`Tag "${tag}" edited successfully!`);
      } else {
        setMessage('Failed to edit tag.');
      }
    } catch (error) {
      console.error('Error editing tag:', error);
      setMessage('An error occurred while editing the tag.');
    }

    setTag('');
    setTopic('');
  };

  const handleDeleteTag = async (e) => {
    e.preventDefault();
    setMessage('Deleting tag...');

    if (!tag.trim()) {
      setMessage('Please enter a valid tag.');
      return;
    }

    try {
      const response = await axios.post(API_ROUTES.DELETE_TAG, {
        data: { tag, topic },
      });

      if (response.status === 200) {
        setMessage(`Tag "${tag}" deleted successfully!`);
      } else {
        setMessage('Failed to delete tag.');
      }
    } catch (error) {
      console.error('Error deleting tag:', error);
      setMessage('An error occurred while deleting the tag.');
    }

    setTag('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', textAlign: 'center',border: '1px solid gray' }}>
      <h1>Tag Actions</h1>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter topic (cap sensitive)"
          style={{ padding: '10px', fontSize: '16px',border: '1px solid gray' }}
        />
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Enter tag name"
          style={{ padding: '10px', fontSize: '16px',border: '1px solid gray' }}
        />
        <button onClick={handleAddTag} style={{ padding: '10px', fontSize: '16px', cursor: 'pointer', background: 'green', color: 'white' }}>
          Add Tag
        </button>

        <button onClick={handleDeleteTag} style={{ padding: '10px', fontSize: '16px', cursor: 'pointer', background: 'red', color: 'white' }}>
          Delete Tag
        </button>
      </form>
      {message && <p style={{ marginTop: '10px', color: message.includes('successfully') ? 'green' : 'red' }}>{message}</p>}
    </div>
  );
};

export default TagActionsPage;
