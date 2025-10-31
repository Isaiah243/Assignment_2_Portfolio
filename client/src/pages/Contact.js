import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    alert(`Thanks for reaching out, ${formData.firstName}!`);

    // Redirect to Home
    navigate('/');
  };

  return (
    <div>
      <h1>Contact</h1>
      <div style={{ marginBottom: '20px' }}>
        <p><strong>Email:</strong> iirisape@my.centennialcollege.ca</p>
        <p><strong>Phone:</strong> 416-123-4786</p>
      </div>

      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <div>
          <label>First Name:</label><br />
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
 
        <div>
          <label>Last Name:</label><br />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <label>Contact Number:</label><br />
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <label>Email Address:</label><br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <label>Message:</label><br />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button type="submit" style={{ marginTop: '10px', padding: '10px 20px', cursor: 'pointer' }}>
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
