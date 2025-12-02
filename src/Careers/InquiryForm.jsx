// // src/components/InquiryForm.jsx
// import React from "react";
// import "./InquiryForm.css"; // optional if you want to style it separately



// const InquiryForm = ({ title = "Inquire Now" }) => {
//   return (
//     <section className="inquiry-section">
//       <h2>{title}</h2>
//       <form className="inquiry-form">
//         <div className="form-group">
//           <label>Name</label>
//           <input type="text" placeholder="Enter your full name" />
//         </div>

//         <div className="form-group">
//           <label>Email</label>
//           <input type="email" placeholder="Enter your email" />
//         </div>

//         <div className="form-group">
//           <label>Comments</label>
//           <textarea rows="4" placeholder="Enter your message"></textarea>
//         </div>

//         <p className="contact-number">
//           📞 Call Us: <strong style={{ color: "red" }}>+91 9922514719</strong>
//         </p>

//         <button type="submit" className="send-btn">
//           Send Inquiry
//         </button>
//       </form>
//     </section>
//   );
// };

// export default InquiryForm;


import React, { useState } from "react";
import axios from "axios";
import "./InquiryForm.css";

const InquiryForm = ({ title = "Inquire Now" }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comments: "",
  });

  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simple validation function
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.comments.trim()) newErrors.comments = "Comments are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Update form state and clear related errors and status message
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setStatus("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setStatus("Sending...");

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("comments", formData.comments);

      const response = await axios.post("https://trustyoudoctor.com/send_mail.php", data);

      if (response.data.success) {
        setStatus("✅ Inquiry sent successfully!");
        setFormData({ name: "", email: "", comments: "" });
      } else {
        setStatus("❌ Failed to send. Please try again.");
      }
    } catch (error) {
      console.error("Error sending inquiry:", error);
      setStatus("⚠️ Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="inquiry-section">
      <h2>{title}</h2>
      <form className="inquiry-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Comments</label>
          <textarea
            name="comments"
            rows="4"
            value={formData.comments}
            onChange={handleChange}
            placeholder="Enter your message"
          />
          {errors.comments && <span className="error-message">{errors.comments}</span>}
        </div>

        <p className="contact-number">
          📞 Call Us: <strong style={{ color: "red" }}>+91 9922514719</strong>
        </p>

        <button type="submit" className="send-btn" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Inquiry"}
        </button>
      </form>

      {status && <p className="status-message">{status}</p>}
    </section>
  );
};

export default InquiryForm;
