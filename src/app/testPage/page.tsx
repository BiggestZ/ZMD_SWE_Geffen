'use client'
import React, { useState } from 'react';

interface TagEditorProps {
  initialTags: string[]; // Array of initial tags passed as a prop
  onTagsUpdate: (updatedTags: string[]) => void; // Callback to pass the updated tags
}

const TagEditor: React.FC<TagEditorProps> = ({ initialTags, onTagsUpdate }) => {
    //onTagsUpdate(["tag1", "tag2", "tag3"]);
  const [tags, setTags] = useState<string[]>(["tag1", "tag2", "tag3","tag4"]); // Manage current tags
  const [newTag, setNewTag] = useState<string>(''); // Manage the input for adding new tags

  // Handle adding a new tag
  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag)) 
        {
            
      setTags([...tags, newTag.trim()]);
      setNewTag(''); // Clear the input field
    }
  };

  // Handle deleting a tag
  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  };

  // Handle finishing the edits
  const handleDone = () => {
    onTagsUpdate(tags); // Pass the updated tags to the parent component
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px' }}>
      <h3>Tag Editor</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        {tags.map((tag, index) => (
          <span
            key={index}
            style={{
              display: 'inline-flex',
              
              alignItems: 'center',
              padding: '5px 10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#000000',
            }}
          >
            {tag}
            <button
              onClick={() => handleDeleteTag(tag)}
              style={{
                marginLeft: '10px',
                background: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                cursor: 'pointer',
              }}
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Add a tag"
          style={{ flex: 1, padding: '10px', fontSize: '16px' }}
        />
        <button
          onClick={handleAddTag}
          style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Add
        </button>
      </div>

      <button
        onClick={handleDone}
        style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        Done
      </button>
    </div>
  );
};

export default TagEditor;
