import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); 

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    message: '',
  });

  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (token) fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch('http://localhost:5000/contacts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('http://localhost:5000/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to save contact');
      } else {
        setSuccess('Message sent!');
        setFormData({ firstName: '', lastName: '', contactNumber: '', email: '', message: '' });
        fetchContacts();
      }
    } catch (err) {
      setError('Server error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;

    try {
      await fetch(`http://localhost:5000/contacts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchContacts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Contact</h1>
      <div style={{ marginBottom: '20px' }}>
        <p><strong>Email:</strong> iirisape@my.centennialcollege.ca</p>
        <p><strong>Phone:</strong> 416-123-4786</p>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

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

      {contacts.length > 0 && (
        <>
          <h3>All Messages</h3>
          <ul>
            {contacts.map(c => (
              <li key={c._id}>
                {c.firstName} {c.lastName} ({c.email}) - {c.message}
                {role === 'admin' && (
                  <button
                    onClick={() => handleDelete(c._id)}
                    style={{ marginLeft: '10px', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Contact;
