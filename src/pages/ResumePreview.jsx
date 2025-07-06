import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { db, auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import "../styles/resumePreview.css";

function ResumePreview() {
  const componentRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "EnableHire Resume",
  });

  useEffect(() => {
    const getData = async () => {
      if (location.state?.formData) {
        setFormData(location.state.formData);
        setLoading(false);
      } else {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, "resumes", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setFormData(data.personalInfo || {});
          } else {
            alert("No resume found. Redirecting...");
            navigate("/resume");
          }
        } else {
          alert("Please log in first.");
          navigate("/");
        }
        setLoading(false);
      }
    };

    getData();
  }, [location.state, navigate]);

  if (loading) return <p>Loading preview...</p>;

  if (!formData) return <p>No data found.</p>;

  return (
    <div className="preview-container">
      <div ref={componentRef} className="resume-card">
        <h1>{formData.name}</h1>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Phone:</strong> {formData.phone}</p>
        <p><strong>Location:</strong> {formData.location}</p>

        <h2>🎓 Education</h2>
        <p>{formData.degree} at {formData.school} ({formData.gradYear})</p>

        <h2>💼 Work Experience</h2>
        <p><strong>{formData.jobTitle}</strong> at {formData.company}</p>
        <p><em>{formData.jobDuration}</em></p>
        <p>{formData.jobDescription}</p>

        <h2>🛠 Skills & Projects</h2>
        <p><strong>Skills:</strong> {formData.skills}</p>
        <p><strong>Project:</strong> {formData.projectTitle}</p>
        <p>{formData.projectDescription}</p>
      </div>

      <button onClick={handlePrint} className="print-btn">
        📄 Download PDF
      </button>
    </div>
  );
}

export default ResumePreview;
