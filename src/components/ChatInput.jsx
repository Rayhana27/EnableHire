import { useState, useEffect, useRef } from 'react';

function ChatInput({ onSend, isLoading }) {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Initialize SpeechRecognition
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    // Set up event handlers
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    // Store the recognition instance
    recognitionRef.current = recognition;

    // Cleanup function to stop recognition on unmount
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput('');
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <div className="input-container">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about job accessibility..."
          aria-label="Type your question here"
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={startListening}
          disabled={isLoading || isListening}
          aria-label="Start voice input"
        >
          🎙️
        </button>
      </div>
      <button type="submit" disabled={isLoading} aria-label="Send message">
        Send
      </button>
    </form>
  );
}

export default ChatInput;