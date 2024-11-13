"use client";

import React, { useState } from 'react';

export default function TagTable() {
  // State to hold the list of sub-tags to display as checkboxes
  const [subTags, setSubTags] = useState<string[]>([]);
  
  // State to track selected tags across categories
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Function to handle the subTag_View logic and update the displayed sub-tags
  const subTag_View = (selectedValue: "1" | "2" | "3") => {
    const tagOptions = {
      "1": ["Art", "Language", "Music"],         // culture sub-tags
      "2": ["Community", "Events", "Networking"], // social sub-tags
      "3": ["Parenting", "Education", "Health"],  // family sub-tags
    };

    const newSubTags = tagOptions[selectedValue] || [];
    setSubTags(newSubTags);
  };

  // Handle change event on the <select> element
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as "1" | "2" | "3";
    subTag_View(selectedValue);
  };

  // Handle checkbox change for each sub-tag
  const handleCheckboxChange = (tag: string) => {
    setSelectedTags((prevSelectedTags) => {
      // Add the tag if it’s not already selected, otherwise remove it
      if (prevSelectedTags.includes(tag)) {
        return prevSelectedTags.filter((t) => t !== tag);
      } else {
        return [...prevSelectedTags, tag];
      }
    });
  };

  return (
    <div>
      {/* Dropdown to select the main category */}
      <select
        className="form-select"
        aria-label="Default select example"
        onChange={handleSelectChange}
      >
        <option value="1">culture</option>
        <option value="2">social</option>
        <option value="3">family</option>
      </select>

      {/* Render the list of sub-tags with checkboxes */}
      {subTags.length > 0 && (
        <div>
          {subTags.map((tag, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={tag}
                name={tag}
                value={tag}
                checked={selectedTags.includes(tag)}
                onChange={() => handleCheckboxChange(tag)}
              />
              <label htmlFor={tag}>{tag}</label>
            </div>
          ))}
        </div>
      )}

      {/* Display selected tags */}
      {selectedTags.length > 0 && (
        <div>
          <h3>Selected Tags:</h3>
          <ul>
            {selectedTags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
