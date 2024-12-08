// src/components/TopicSelector.tsx
'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ROUTES } from '../pages/api/getTags/route';

interface TopicSelectorProps {
    onSubmit: (savedTags: string[]) => void;
  }

  const TopicSelector: React.FC<TopicSelectorProps> = ({ onSubmit }) => {
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [subtopics, setSubtopics] = useState<string[]>([]);
  const [selectedSubtopics, setSelectedSubtopics] = useState<string[]>([]);
  const [loadingTopics, setLoadingTopics] = useState<boolean>(false);
  const [loadingSubtopics, setLoadingSubtopics] = useState<boolean>(false);
  const [savedTags, setSavedTags] = useState<string[]>([]);
  const [savedSubtopics, setSavedSubtopics] = useState<string[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      setLoadingTopics(true);
      try {
        const response = await axios.get(API_ROUTES.GET_TAGS);
        const data = response.data;
        console.log('Fetched topics data:', data.topics);
        if (Array.isArray(data.topics)) {
          setTopics(data.topics);
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

  useEffect(() => {
    if (!selectedTopic) return;

    const fetchSubtopics = async () => {
      setLoadingSubtopics(true);
      console.log('selectedTopic:', selectedTopic);
      try {
        const response = await axios.get(API_ROUTES.GET_SUBTAGS, {
          params: { topic: selectedTopic }
        });
        const data = response.data;
        console.log('Fetched subtopics data:', data);
        if (Array.isArray(data.subtopics)) {
          setSubtopics(data.subtopics);
        } else {
          console.error('Unexpected response format:', data);
        }
      } catch (error) {
        console.error('Error fetching subtopics:', error);
      } finally {
        setLoadingSubtopics(false);
      }
    };

    fetchSubtopics();
  }, [selectedTopic]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Selected Topic:', selectedTopic);
    console.log('Selected Subtopics:', selectedSubtopics);
    setSavedTags(selectedSubtopics);
    e.preventDefault();
    setSavedSubtopics((prevSavedSubtopics) => {
        const newSubtopics = selectedSubtopics.filter(subtopic => !prevSavedSubtopics.includes(subtopic));
        return [...prevSavedSubtopics, ...newSubtopics];
      });
      console.log('Saved Subtopics:', savedSubtopics); 
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saved Tags:', savedTags); 
    onSubmit(savedTags);
    
  };

  return (
    <div style={{ padding: '20px', color: 'black'  }}>
      <h2>Topic Selector</h2>

      <div style={{ color: 'black' }}>
        <label>
          Select a Topic:
          {loadingTopics ? (
            <span>Loading topics...</span>
          ) : (
            <select
              style={{ color: 'black' }}
              value={selectedTopic}
              onChange={(e) => {
                setSelectedTopic(e.target.value);
                setSelectedSubtopics([]);
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

      <button
        onClick={handleSave}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: 'blue',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        save
      </button>

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