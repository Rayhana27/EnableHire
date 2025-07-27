import ChatbotWidget from "../components/ChatbotWidget";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import "../styles/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [hasSpoken, setHasSpoken] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const user = auth.currentUser;

  // ✅ Welcome speech (only once)
  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (!hasSpoken) {
      speak(`Welcome to EnableHire, logged in as ${user.email}`, () => {
        setIsSpeaking(false);
        setHasSpoken(true);
      });
      setIsSpeaking(true);
    }
  }, [user, navigate, hasSpoken]);

  // 🗣️ Speak function with completion handler
  const speak = (text, onend = () => {}) => {
    window.speechSynthesis.cancel(); // Cancel any ongoing voice
    const message = new SpeechSynthesisUtterance(text);
    message.lang = "en-US";
    message.pitch = 1;
    message.rate = 1;
    message.volume = 1;

    message.onend = onend;
    window.speechSynthesis.speak(message);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  // 🟡 Safe hover speaker (only if not speaking welcome)
  const speakOnHover = (text) => {
    if (!isSpeaking) {
      speak(text);
    }
  };

  return (
    <div className="dashboard-container">
      {/* 🔷 Nav buttons with safe speech */}
      <nav className="dashboard-navbar">
        <button
          onMouseEnter={() => speakOnHover("Build Resume")}
          onClick={() => navigate("/resume")}
        >
          🧰 Build Resume
        </button>
        <button
          onMouseEnter={() => speakOnHover("Search Jobs")}
          onClick={() => navigate("/search-jobs")}
        >
          🔍 Search Jobs
        </button>
        <button
          onMouseEnter={() => speakOnHover("Edit Profile")}
          onClick={() => navigate("/profile")}
        >
          👤 Edit Profile
        </button>
      </nav>

      <div className="dashboard-card">
        <h1>🎉 Welcome to EnableHire</h1>
        <p className="user-email">
          Logged in as: <strong>{user?.email}</strong>
        </p>

        <div className="actions">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      
      <ChatbotWidget />

    </div>
  );
}

export default Dashboard;
