import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "../styles/editprofile.css";

const speak = (text) => {
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "en-US";
  msg.pitch = 1;
  msg.rate = 1;
  window.speechSynthesis.cancel(); // stop previous
  window.speechSynthesis.speak(msg);
};

const startSpeechToText = (setter) => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return;

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.onresult = (event) => {
    const result = event.results[0][0].transcript;
    setter((prev) => (prev ? `${prev} ${result}` : result));
  };
  recognition.start();
};

const EditProfile = () => {
  const user = auth.currentUser;

  const [name, setName] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [mobile, setMobile] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [photo, setPhoto] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [message, setMessage] = useState("");
  const [openTo, setOpenTo] = useState([]);

  const workTags = [
    "Motivational Speaker",
    "Public Speaker",
    "Remote Jobs",
    "Internships",
    "Full-time",
    "Part-time",
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || "");
          setPreviewURL(data.photoURL || "");
          setMobile(data.mobile || "");
          setHobbies(data.hobbies || "");
          setOpenTo(data.openTo || []);
        }
      }
    };
    fetchProfile();
  }, [user]);

  const handlePhotoClick = () => {
    document.getElementById("photoInput").click();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreviewURL(URL.createObjectURL(file)); // preview only
    }
  };

  const toggleTag = (tag) => {
    setOpenTo((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        mobile,
        hobbies,
        openTo,
      });
      setMessage("✅ Profile updated successfully!");
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Failed to update profile.");
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-banner">
        <div className="profile-image" onClick={handlePhotoClick}>
          {previewURL ? (
            <img src={previewURL} alt="Profile" />
          ) : (
            <div className="placeholder">👤</div>
          )}
          <input
            type="file"
            id="photoInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handlePhotoChange}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="profile-form">
        <label
          className="speakable"
          onMouseEnter={() => speak("Full Name")}
        >
          Full Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onDoubleClick={() => startSpeechToText(setName)}
        />

        <label
          className="speakable"
          onMouseEnter={() => speak("Email")}
        >
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label
          className="speakable"
          onMouseEnter={() => speak("Mobile Number")}
        >
          Mobile Number
        </label>
        <input
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          onDoubleClick={() => startSpeechToText(setMobile)}
        />

        <label
          className="speakable"
          onMouseEnter={() => speak("Hobbies")}
        >
          Hobbies
        </label>
        <textarea
          value={hobbies}
          onChange={(e) => setHobbies(e.target.value)}
          onDoubleClick={() => startSpeechToText(setHobbies)}
        />

        <label
          className="speakable"
          onMouseEnter={() => speak("Open to work as")}
        >
          Open to work as:
        </label>
        <div className="tags-container">
          {workTags.map((tag) => (
            <div
              key={tag}
              className={`tag ${openTo.includes(tag) ? "selected" : ""}`}
              onClick={() => toggleTag(tag)}
              onMouseEnter={() => speak(tag)}
            >
              {tag}
            </div>
          ))}
        </div>

        <button type="submit">Save Changes</button>
        {message && <p className="status">{message}</p>}
      </form>
    </div>
  );
};

export default EditProfile;
