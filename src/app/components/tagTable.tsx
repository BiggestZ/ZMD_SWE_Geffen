"use client";

import React, { useEffect, useState } from 'react';

interface TagTableProps {
  resetTrigger: boolean;
  onResetHandled: () => void;
  onTagsSelected: (tags: string[]) => void; // Callback to send selected tags to parent
}

export default function TagTable({ resetTrigger, onResetHandled, onTagsSelected }: TagTableProps) {
  const [subTags, setSubTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [topics, setTopics] = useState<any[]>([]);

  const subTag_View = (selectedValue: "1" | "2" | "3") => {
    const tagOptions = {
      "1": ["Art", "Language", "Music"],
      "2": ["Community", "Events", "Networking"],
      "3": ["Parenting", "Education", "Health"],
    };

    const newSubTags = tagOptions[selectedValue] || [];
    setSubTags(newSubTags);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as "1" | "2" | "3";
    subTag_View(selectedValue);
  };

  const handleCheckboxChange = (tag: string) => {
    setSelectedTags((prevSelectedTags) => {
      const updatedTags = prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag];
      return updatedTags;
    });
  };

  // Notify parent about selected tags after `selectedTags` state updates
  useEffect(() => {
    onTagsSelected(selectedTags);
  }, [selectedTags, onTagsSelected]);

  // Reset logic when resetTrigger changes
  useEffect(() => {
    if (resetTrigger) {
      setSubTags([]);
      setSelectedTags([]);
      onResetHandled();
    }
  }, [resetTrigger, onResetHandled]);

  return (
    <div>
      <select className="form-select" aria-label="Default select example" onChange={handleSelectChange}>
        <option value="0">Select a tag</option>
        <option value="1">culture</option>
        <option value="2">social</option>
        <option value="3">family</option>
      </select>

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

//==================================================================================================
// "use client";

// import React, { useEffect, useState } from 'react';

// interface TagTableProps {
//   resetTrigger: boolean;
//   onResetHandled: () => void;
//   onTagsSelected: (tags: string[]) => void; // Callback to send selected tags to parent
// }

// export default function TagTable({ resetTrigger, onResetHandled, onTagsSelected }: TagTableProps) {
//   const [subTags, setSubTags] = useState<string[]>([]);
//   const [selectedTags, setSelectedTags] = useState<string[]>([]);
//   const [topics, setTopics] = useState<any[]>([]);

//   const subTag_View = (selectedValue: "1" | "2" | "3") => {
//     const tagOptions = {
//       "1": ["Art", "Language", "Music"],
//       "2": ["Community", "Events", "Networking"],
//       "3": ["Parenting", "Education", "Health"],
//     };

//     const newSubTags = tagOptions[selectedValue] || [];
//     setSubTags(newSubTags);
//   };

//   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedValue = e.target.value as "1" | "2" | "3";
//     subTag_View(selectedValue);
//   };

//   const handleCheckboxChange = (tag: string) => {
//     setSelectedTags((prevSelectedTags) => {
//       const updatedTags = prevSelectedTags.includes(tag)
//         ? prevSelectedTags.filter((t) => t !== tag)
//         : [...prevSelectedTags, tag];
//       return updatedTags;
//     });
//   };

//   // Notify parent about selected tags after `selectedTags` state updates
//   useEffect(() => {
//     onTagsSelected(selectedTags);
//   }, [selectedTags, onTagsSelected]);

//   // Reset logic when resetTrigger changes
//   useEffect(() => {
//     if (resetTrigger) {
//       setSubTags([]);
//       setSelectedTags([]);
//       onResetHandled();
//     }
//   }, [resetTrigger, onResetHandled]);

//   return (
//     <div>
//       <select className="form-select" aria-label="Default select example" onChange={handleSelectChange}>
//         <option value="0">Select a tag</option>
//         <option value="1">culture</option>
//         <option value="2">social</option>
//         <option value="3">family</option>
//       </select>

//       {subTags.length > 0 && (
//         <div>
//           {subTags.map((tag, index) => (
//             <div key={index}>
//               <input
//                 type="checkbox"
//                 id={tag}
//                 name={tag}
//                 value={tag}
//                 checked={selectedTags.includes(tag)}
//                 onChange={() => handleCheckboxChange(tag)}
//               />
//               <label htmlFor={tag}>{tag}</label>
//             </div>
//           ))}
//         </div>
//       )}

//       {selectedTags.length > 0 && (
//         <div>
//           <h3>Selected Tags:</h3>
//           <ul>
//             {selectedTags.map((tag, index) => (
//               <li key={index}>{tag}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }


