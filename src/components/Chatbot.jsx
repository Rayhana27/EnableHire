import { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import '../styles/chatbot.css';


function Chatbot() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I’m here to help with job accessibility questions.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const messagesEndRef = useRef(null);
  const utteranceRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message) => {
    setMessages((prev) => [...prev, { role: 'user', content: message }]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      const data = await response.json();
      if (data.error) {
        setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, try again.' }]);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
        const utterance = new SpeechSynthesisUtterance(data.response);
        utterance.lang = 'en-US';
        utterance.onend = () => setIsPaused(false); // Reset pause state when done
        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Server error.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const stopReading = () => {
    if (utteranceRef.current && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Reading paused. Click Resume to continue.' }
      ]);
    }
  };

  const resumeReading = () => {
    if (utteranceRef.current && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setMessages((prev) => prev.filter(msg => msg.content !== 'Reading paused. Click Resume to continue.'));
    }
  };

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: 'Hello! I’m here to help with job accessibility questions.' }]);
    if (utteranceRef.current && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsPaused(false);
    }
  };

  return (
    <div className="chatbot" role="dialog" aria-label="Chatbot for job accessibility">
      <div className="chatbot-header">
        <h2>Job Accessibility Assistant</h2>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <ChatMessage key={index} role={msg.role} content={msg.content} />
        ))}
        {isLoading && <ChatMessage role="assistant" content="Typing..." />}
        <div ref={messagesEndRef} />
      </div>
      <div className="chatbot-controls">
        {!isPaused && (
          <button onClick={stopReading} disabled={!window.speechSynthesis.speaking}>
            Stop Reading
          </button>
        )}
        {isPaused && (
          <button onClick={resumeReading}>
            Resume Reading
          </button>
        )}
        <button onClick={clearChat}>Clear Chat</button>
      </div>
      <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}

export default Chatbot;