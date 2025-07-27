function ChatMessage({ role, content }) {
  return (
    <div className={`chat-message ${role}`}>
      <div className="message-content">
        <span>{content}</span>
      </div>
    </div>
  );
}

export default ChatMessage;