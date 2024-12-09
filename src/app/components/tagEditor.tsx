import React, { useState } from 'react';

interface TagEditorProps {
  initialTags: string[]; // Array of initial tags passed as a prop
  onTagsUpdate: (updatedTags: string[]) => void; // Callback to pass the updated tags
}

const tagEditor: React.FC<TagEditorProps> = ({ initialTags, onTagsUpdate }) => {
  const [tags, setTags] = useState<string[]>(initialTags); // Use initialTags passed in as a prop
  const [newTag, setNewTag] = useState<string>(''); // Manage the input for adding new tags

  // Handle adding a new tag
  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag.trim() && !tags.includes(newTag)) {
      setTags([...tags, newTag.trim()]);
      setNewTag(''); // Clear the input field
    }
  };

  // Handle deleting a tag
  const handleDeleteTag = (tagToDelete: string) => {
    setTags((prevTags) => prevTags.filter(tag => tag !== tagToDelete));
  };

  const handleTagChange = (newTags: string[]) => {
    
    setTags(newTags);
    onTagsUpdate(newTags);
  };
  

  // Handle finishing the edits
  const handleDone = (e: React.FormEvent) => {
    e.preventDefault();
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
              
            }}
          >
            {tag}
            <button
             type="button"
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
        <button
          onClick={handleDone}
          style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          done
        </button>
        

      </div>

      
    </div>
  );
};

export default tagEditor;
