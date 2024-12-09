// src/components/TopicSelector.tsx
'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ROUTES } from '../pages/api/getTags/route';

interface ThisTopicSelectorProps {
    tags: (savedTag: string) => void;
    resetTrigger: boolean;
    onResetHandled: () => void;
  }

  const TopicSelector: React.FC<ThisTopicSelectorProps> = ({ tags, resetTrigger, onResetHandled}) => {
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [subtopics, setSubtopics] = useState<string[]>([]);
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>('');
  const [loadingTopics, setLoadingTopics] = useState<boolean>(false);
  const [loadingSubtopics, setLoadingSubtopics] = useState<boolean>(false);

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
    if (resetTrigger) {
      setSelectedTopic('');
      setSelectedSubtopic('');
      onResetHandled();
    }
  },[resetTrigger, onResetHandled])

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

  useEffect(() => {
    tags(selectedSubtopic)
  }, [tags, selectedSubtopic])
  
  return (
      <div className='max-w-xl'>
        <label>
          Select a Topic:
          {loadingTopics ? (
            <span>Loading topics...</span>
          ) : (
            <select
              value={selectedTopic}
              onChange={(e) => {
                setSelectedTopic(e.target.value);
                setSelectedSubtopic('');
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

      {selectedTopic && (
        <div>
          <h3>Subtopics for: {selectedTopic}</h3>
          <h4>Please select only one:</h4>
          {loadingSubtopics ? (
            <span>Loading subtopics...</span>
          ) : (
            <div>
              {subtopics.length > 0 ? (
                subtopics.map((subtopic, index) => (
                  <div key={index}>
                    <label>
                      <input
                        type='checkbox'
                        value={subtopic}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setSelectedSubtopic(subtopic);
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
    </div>
  );
};

export default TopicSelector;