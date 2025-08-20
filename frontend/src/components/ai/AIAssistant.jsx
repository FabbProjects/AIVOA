// src/components/ai/AIAssistant.jsx

import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaSpinner, FaTimes, FaLightbulb } from 'react-icons/fa';
import { askAI } from '../../features/events/eventService'; // We will create this next
import './AIAssistant.css'; // And this CSS file

const suggestionPrompts = [
  "Show high-risk events.",
  "Summarize open events for the last month.",
  "Suggest next steps for event ID 1.",
  "Generate a draft notification for event closure 2."
];

function AIAssistant({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Add initial greeting when the chat opens for the first time
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { sender: 'ai', text: 'Hello! I am your QMS Assistant. How can I help you today?' }
      ]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (promptText) => {
    const text = promptText || inputValue;
    if (!text.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await askAI(text);
      setMessages(prev => [...prev, { sender: 'ai', text: response.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'ai', text: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (prompt) => {
    setInputValue(prompt);
    handleSendMessage(prompt);
  };

  if (!isOpen) return null;

  return (
    <div className="ai-assistant-overlay">
      <div className="ai-assistant-modal">
        <div className="ai-header">
          <h3>QMS AI Assistant</h3>
          <button onClick={onClose} className="ai-close-btn"><FaTimes /></button>
        </div>

        <div className="ai-messages-container">
          {messages.map((msg, index) => (
            <div key={index} className={`ai-message ${msg.sender}`}>
              <div className="message-bubble">{msg.text}</div>
            </div>
          ))}
          {isLoading && (
            <div className="ai-message ai">
              <div className="message-bubble loading">
                <FaSpinner className="spinner" /> Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="ai-suggestions">
          {suggestionPrompts.map((prompt, i) => (
            <button key={i} onClick={() => handleSuggestionClick(prompt)}>
              <FaLightbulb /> {prompt}
            </button>
          ))}
        </div>

        <div className="ai-input-area">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
            placeholder="Ask me anything about your events..."
            disabled={isLoading}
          />
          <button onClick={() => handleSendMessage()} disabled={isLoading}>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIAssistant;