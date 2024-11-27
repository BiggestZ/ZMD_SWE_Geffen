'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ROUTES } from '../pages/api/getTags/route';

const TopicSelector = () => {
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [subtopics, setSubtopics] = useState<string[]>([]);
  const [selectedSubtopics, setSelectedSubtopics] = useState<string[]>([]);
  const [loadingTopics, setLoadingTopics] = useState<boolean>(false);
  const [loadingSubtopics, setLoadingSubtopics] = useState<boolean>(false);

  // Fetch the list of topics when the component mounts
  useEffect(() => {
    const fetchTopics = async () => {
      setLoadingTopics(true);
      try {
        //axios.get(API_ROUTES.EDIT_BOOK
        const response = await axios.get(API_ROUTES.GET_TAGS); // Replace with your API
        // const data = await response.json();
        const data = response.data;
        console.log('Fetched topics data:', data.topics);
        if (Array.isArray(data.topics)) {
          setTopics(data.topics); // Assuming the API returns { topics: [] }
        } else {
          console.error('Unexpected response format:', data);
        }
      } catch (error) {
        console.error('Error fetching topics:', error);
      } finally {
        setLoadingTopics(false);
      }
    };

    fetchTopics();
  }, []);

  // Fetch subtopics when a topic is selected
  useEffect(() => {
    if (!selectedTopic) return; // Only fetch if a topic is selected

    const fetchSubtopics = async () => {
      setLoadingSubtopics(true);
      console.log('selectedTopic:', selectedTopic);
      try {
        const response = await axios.get(API_ROUTES.GET_SUBTAGS
          , 
          {
          params: { topic: selectedTopic }
        }
      );
        console.log('BOOOOOO');

        const data = response.data;
        console.log('Fetched subtopics data:', data);

        setSubtopics(data.subtopics); // Assuming the API returns { subtopics: [] }
      } catch (error) {
        console.error('Error fetching subtopics:', error);
      } finally {
        setLoadingSubtopics(false);
      }
    };

    fetchSubtopics();
  }, [selectedTopic]);

  // Handle form submission
  const handleSubmit = () => {
    console.log('Selected Topic:', selectedTopic);
    console.log('Selected Subtopics:', selectedSubtopics);

    // Submit the data to an API or handle locally
    fetch('https://api.example.com/saveSelection', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: selectedTopic,
        subtopics: selectedSubtopics,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Saved successfully:', data);
      })
      .catch((error) => {
        console.error('Error saving selection:', error);
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Topic Selector</h2>

      {/* Topics Dropdown */}
      <div>
        <label>
          Select a Topic:
          {loadingTopics ? (
            <span>Loading topics...</span>
          ) : (
            <select
              value={selectedTopic}
              onChange={(e) => {
                setSelectedTopic(e.target.value);
                setSelectedSubtopics([]); // Reset subtopics when a new topic is selected
              }}
            >
              <option value="">--Choose a Topic--</option>
              {topics.map((topic, index) => (
                <option key={index} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          )}
        </label>
      </div>

      {/* Subtopics List */}
      {selectedTopic && (
        <div>
          <h3>Subtopics for: {selectedTopic}</h3>
          {loadingSubtopics ? (
            <span>Loading subtopics...</span>
          ) : (
            <div>
              {subtopics.length > 0 ? (
                subtopics.map((subtopic, index) => (
                  <div key={index}>
                    <label>
                      <input
                        type="checkbox"
                        value={subtopic}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setSelectedSubtopics((prev) =>
                            checked
                              ? [...prev, subtopic]
                              : prev.filter((item) => item !== subtopic)
                          );
                        }}
                      />
                      {subtopic}
                    </label>
                  </div>
                ))
              ) : (
                <span>No subtopics available.</span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Submit Button */}
      {selectedTopic && selectedSubtopics.length > 0 && (
        <button
          onClick={handleSubmit}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default TopicSelector;
