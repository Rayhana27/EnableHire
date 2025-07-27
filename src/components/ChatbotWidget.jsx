import { useState } from "react";
import Chatbot from "./Chatbot";
import "../styles/chatbot.css"; // ✅ Import your chatbot styles

export default function ChatbotWidget() {
  const [show, setShow] = useState(false);

  return (
    <>
      {/* Floating button using class */}
      <button
        className="chat-toggle"
        onClick={() => setShow((prev) => !prev)}
        aria-label="Toggle Chatbot"
      >
        🤖
      </button>

      {/* Chatbot popup with full styling */}
      {show && (
        <div className="chatbot">
          <Chatbot />
        </div>
      )}
    </>
  );
}
