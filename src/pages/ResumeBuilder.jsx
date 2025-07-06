import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import "../styles/resume.css";

function ResumeBuilder() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    school: "",
    degree: "",
    gradYear: "",
     company: "", 
     jobTitle: "", 
     jobDuration: "", 
     jobDescription: "",
     skills: "",
    projectTitle: "",
    projectDescription: ""

  });


  const speak = (text) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);
  };

  useEffect(() => {
    speak("Welcome to Resume Builder. Please fill in your personal information.");
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleHover = (fieldName, message) => {
    if (formData[fieldName].trim() === "") {
      speak(message);
    }
  };

  const handleSave = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please log in to save your resume.");
      return;
    }

    try {
      const docRef = doc(db, "resumes", user.uid);
      await setDoc(docRef, {
        personalInfo: formData,
        updatedAt: new Date()
      });
     alert("Saved successfully!");
     navigate("/preview", { state: { formData } });

    } catch (error) {
      console.error("Error saving resume:", error);
      alert("Something went wrong while saving.");
    }
  };

  return (
    <div className="resume-builder-container">
      <h2>🧰 Resume Builder - Step 1: Personal Info</h2>

      <form className="resume-form">
        <label>
          Full Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onMouseEnter={() => handleHover("name", "Enter your full name")}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onMouseEnter={() => handleHover("email", "Enter your email address")}
          />
        </label>

        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onMouseEnter={() => handleHover("phone", "Enter your phone number")}
          />
        </label>

        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            onMouseEnter={() => handleHover("location", "Enter your location or city")}
          />
        </label>
      <h3>🎓 Education</h3>

<label>
  School / University:
  <input
    type="text"
    name="school"
    value={formData.school || ""}
    onChange={handleChange}
    onMouseEnter={() => handleHover("school", "Enter your school or university name")}
  />
</label>

<label>
  Degree:
  <input
    type="text"
    name="degree"
    value={formData.degree || ""}
    onChange={handleChange}
    onMouseEnter={() => handleHover("degree", "Enter your degree or qualification")}
  />
</label>

<label>
  Year of Passing:
  <input
    type="text"
    name="gradYear"
    value={formData.gradYear || ""}
    onChange={handleChange}
    onMouseEnter={() => handleHover("gradYear", "Enter your year of passing")}
  />
</label>
<h3>💼 Work Experience</h3>

<label>
  Company Name:
  <input
    type="text"
    name="company"
    value={formData.company}
    onChange={handleChange}
    onMouseEnter={() => handleHover("company", "Enter your company name")}
  />
</label>

<label>
  Job Title:
  <input
    type="text"
    name="jobTitle"
    value={formData.jobTitle}
    onChange={handleChange}
    onMouseEnter={() => handleHover("jobTitle", "Enter your job title")}
  />
</label>

<label>
  Duration:
  <input
    type="text"
    name="jobDuration"
    value={formData.jobDuration}
    onChange={handleChange}
    onMouseEnter={() => handleHover("jobDuration", "Enter duration of your work")}
  />
</label>

<label>
  Description:
  <textarea
    name="jobDescription"
    value={formData.jobDescription}
    onChange={handleChange}
    onMouseEnter={() => handleHover("jobDescription", "Describe your role or responsibilities")}
  />
</label>
<h3>🧠 Skills & Projects</h3>

<label>
  Skills (comma separated):
  <input
    type="text"
    name="skills"
    value={formData.skills}
    onChange={handleChange}
    onMouseEnter={() => handleHover("skills", "Enter your skills separated by commas")}
  />
</label>

<label>
  Project Title:
  <input
    type="text"
    name="projectTitle"
    value={formData.projectTitle}
    onChange={handleChange}
    onMouseEnter={() => handleHover("projectTitle", "Enter your project title")}
  />
</label>

<label>
  Project Description:
  <textarea
    name="projectDescription"
    value={formData.projectDescription}
    onChange={handleChange}
    onMouseEnter={() => handleHover("projectDescription", "Describe your project")}
  />
</label>

        <button type="button" onClick={handleSave}>
          💾 Save & Continue
        </button>
      </form>
    </div>
  );
  
}

export default ResumeBuilder;
