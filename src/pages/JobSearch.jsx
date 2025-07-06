import React, { useState } from "react";
import "../styles/jobsearch.css";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "InclusiveTech",
    location: "Remote",
    type: "Full-time",
    description: "Build accessible UI components using React.",
    accessibility: ["Remote Work Friendly 🌐", "Screen Reader Friendly"]
  },
  {
    id: 2,
    title: "Receptionist",
    company: "CareHospitals",
    location: "Chennai",
    type: "Full-time",
    description: "Greet visitors, manage calls and appointments.",
    accessibility: ["Wheelchair Accessible 🦽"]
  },
  {
    id: 3,
    title: "Data Entry Clerk",
    company: "InfoSolutions",
    location: "Remote",
    type: "Part-time",
    description: "Type and manage data from PDFs and images.",
    accessibility: ["Remote Work Friendly 🌐"]
  },
  {
    id: 4,
    title: "Craft Workshop Assistant",
    company: "HandiCrafts",
    location: "Hyderabad",
    type: "Part-time",
    description: "Assist in organizing craft sessions for local women.",
    accessibility: ["Flexible Hours ⏰"]
  },
  {
    id: 5,
    title: "Customer Support Agent",
    company: "SoftServe",
    location: "Remote",
    type: "Full-time",
    description: "Answer customer queries via chat and email.",
    accessibility: ["Remote Work Friendly 🌐", "Text Chat Only"]
  },
  {
    id: 6,
    title: "Mobility Equipment Tester",
    company: "MoveWell Labs",
    location: "Bangalore",
    type: "Contract",
    description: "Test wheelchairs and walking aids for safety.",
    accessibility: ["Wheelchair Accessible 🦽"]
  },
  {
    id: 7,
    title: "Library Assistant",
    company: "SmartReads",
    location: "Kolkata",
    type: "Part-time",
    description: "Help categorize books and assist readers.",
    accessibility: ["Quiet Environment", "Wheelchair Accessible 🦽"]
  },
  {
    id: 8,
    title: "Voice Assistant Tester",
    company: "VoiceAccess",
    location: "Chennai",
    type: "Part-time",
    description: "Test speech-enabled apps for accessibility.",
    accessibility: ["Remote Work Friendly 🌐"]
  },
  {
    id: 9,
    title: "Workshop Translator (ASL)",
    company: "DeafConnect",
    location: "Delhi",
    type: "Contract",
    description: "Interpret workshop sessions in sign language.",
    accessibility: ["ASL Support 🤟"]
  },
  {
    id: 10,
    title: "Junior Graphic Designer",
    company: "A11y Designs",
    location: "Remote",
    type: "Internship",
    description: "Design flyers and social media posters.",
    accessibility: ["Flexible Hours ⏰", "Remote Work Friendly 🌐"]
  },
  {
    id: 11,
    title: "Social Media Manager",
    company: "PwD Voices",
    location: "Remote",
    type: "Part-time",
    description: "Manage Instagram and LinkedIn pages for NGO.",
    accessibility: ["Remote Work Friendly 🌐"]
  },
  {
    id: 12,
    title: "Tutor (Mathematics)",
    company: "SmartTutors",
    location: "Online",
    type: "Part-time",
    description: "Teach basic mathematics for 8th-10th grade.",
    accessibility: ["Remote Work Friendly 🌐", "Flexible Hours ⏰"]
  },
  {
    id: 13,
    title: "Content Writer",
    company: "AbleInk",
    location: "Remote",
    type: "Freelance",
    description: "Write blog articles on accessibility topics.",
    accessibility: ["Remote Work Friendly 🌐"]
  },
  {
    id: 14,
    title: "Delivery Associate",
    company: "QuickKart",
    location: "Mumbai",
    type: "Full-time",
    description: "Deliver groceries and packages to customers.",
    accessibility: ["Flexible Hours ⏰"]
  },
  {
    id: 15,
    title: "HR Assistant",
    company: "GreenWorks",
    location: "Coimbatore",
    type: "Full-time",
    description: "Assist HR manager with recruitment and onboarding.",
    accessibility: ["Wheelchair Accessible 🦽"]
  },
  {
    id: 16,
    title: "Accessibility QA Tester",
    company: "InclusionTech",
    location: "Remote",
    type: "Full-time",
    description: "Test websites and apps for accessibility compliance.",
    accessibility: ["Remote Work Friendly 🌐", "Screen Reader Friendly"]
  },
  {
    id: 17,
    title: "Store Assistant",
    company: "FabMart",
    location: "Pune",
    type: "Full-time",
    description: "Assist customers in store and manage billing.",
    accessibility: ["Wheelchair Accessible 🦽"]
  },
  {
    id: 18,
    title: "Digital Illustrator",
    company: "NeonArts",
    location: "Remote",
    type: "Freelance",
    description: "Create illustrations for books and websites.",
    accessibility: ["Remote Work Friendly 🌐"]
  },
  {
    id: 19,
    title: "Home Science Assistant",
    company: "SkillCare",
    location: "Ahmedabad",
    type: "Part-time",
    description: "Assist in kitchen and fabric-based tasks.",
    accessibility: ["Flexible Hours ⏰"]
  },
  {
    id: 20,
    title: "Call Center Operator",
    company: "TeleSupport",
    location: "Hyderabad",
    type: "Full-time",
    description: "Answer customer calls and escalate queries.",
    accessibility: ["Wheelchair Accessible 🦽", "Text-Based Chat Available"]
  },
];

function JobSearch() {
  const [search, setSearch] = useState("");

  const speak = (text) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);
  };

  const filtered = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="jobsearch-container">
      <h2>🔍 Search Jobs</h2>
      <input
        type="text"
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onMouseEnter={() => speak("Search by job title")}
        placeholder="Type a job title like developer or assistant"
      />

      <div className="job-list">
        {filtered.map((job) => (
          <div
            key={job.id}
            className="job-card"
            onMouseEnter={() => speak(`${job.title} at ${job.company}. Location: ${job.location}. ${job.accessibility.join(", ")}`)}
          >
            <h3>{job.title}</h3>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Type:</strong> {job.type}</p>
            <p>{job.description}</p>
            <p><strong>Accessibility:</strong> {job.accessibility.join(", ")}</p>
            <button className="apply-btn">Apply</button>
          </div>
        ))}
        {filtered.length === 0 && <p>No matching jobs found.</p>}
      </div>
    </div>
  );
}

export default JobSearch;
