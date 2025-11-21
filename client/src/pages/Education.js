import React, { useState, useEffect } from 'react';

const Education = () => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldOfStudy: '',
    year: ''
  });

  const [educationList, setEducationList] = useState([
    {
      id: "local1",
      school: "St George H.S",
      degree: "Highschool Diploma",
      fieldOfStudy: "",
      year: "2021"
    },
    {
      id: "local2",
      school: "Centennial College",
      degree: "Diploma in Software Engineering",
      fieldOfStudy: "",
      year: "2023 - Present"
    }
  ]);

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (token) fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const res = await fetch('http://localhost:5000/education', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();

      const merged = [...educationList];
      data.forEach(item => {
        if (!merged.find(e => e._id === item._id)) merged.push(item);
      });

      setEducationList(merged);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert('Please sign in to save education');

    try {
      await fetch('http://localhost:5000/education', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      setFormData({
        school: '',
        degree: '',
        fieldOfStudy: '',
        year: ''
      });

      fetchEducation();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (role !== 'admin') return alert('Only admin can delete');
    if (!window.confirm('Delete this entry?')) return;

    try {
      await fetch(`http://localhost:5000/education/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      setEducationList(educationList.filter(e => e._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Education / Qualification</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
        <div>
          <label>School:</label><br />
          <input
            type="text"
            name="school"
            value={formData.school}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <label>Degree:</label><br />
          <input
            type="text"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <label>Field of Study:</label><br />
          <input
            type="text"
            name="fieldOfStudy"
            value={formData.fieldOfStudy}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <label>Year:</label><br />
          <input
            type="text"
            name="year"
            placeholder="e.g., 2021 or 2023 - Present"
            value={formData.year}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button type="submit" style={{ marginTop: '10px', padding: '10px 20px', cursor: 'pointer' }}>
          Save
        </button>
      </form>

      <h3>All Education Entries</h3>

      <ul>
        {educationList.map(e => (
          <li key={e._id || e.id}>
            <strong>{e.school}</strong> — {e.degree}
            {e.fieldOfStudy && ` (${e.fieldOfStudy})`}
            <br />
            <em>{e.year}</em>

            {role === 'admin' && e._id && (
              <button
                onClick={() => handleDelete(e._id)}
                style={{ marginLeft: '10px', cursor: 'pointer' }}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Education;
