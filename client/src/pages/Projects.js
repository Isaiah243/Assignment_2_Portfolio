import React, { useState, useEffect } from 'react';

const Project = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: ''
  });

  const [projects, setProjects] = useState([
    {
      id: "local1",
      title: "My Portfolio",
      image: "logo192.png",
      description: "I created this site using React and implemented functional features to navigate through the site."
    },
    {
      id: "local2",
      title: "Interest Calculator",
      image: "intcalculator.png",
      description: "Allows user input of money, interest rate, and years to calculate the total amount."
    },
    {
      id: "local3",
      title: "Currency Converter",
      image: "currencyconverter1.jpeg",
      description: "Work in progress: users will convert currency types and see the exchange rate for an amount entered."
    }
  ]);

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (token) fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('http://localhost:5000/projects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();

      const merged = [...projects];
      data.forEach(p => {
        if (!merged.find(pr => pr._id === p._id)) merged.push(p);
      });

      setProjects(merged);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert('Sign in to add projects');

    try {
      await fetch('http://localhost:5000/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      setFormData({ title: '', description: '', link: '' });
      fetchProjects();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (role !== 'admin') return alert('Only admin can delete');
    if (!window.confirm('Delete this project?')) return;

    try {
      await fetch(`http://localhost:5000/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Projects</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
        <div>
          <label>Title:</label><br />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <label>Description:</label><br />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <label>Project Link (Optional):</label><br />
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button
          type="submit"
          style={{ marginTop: '10px', padding: '10px 20px', cursor: 'pointer' }}
        >
          Save Project
        </button>
      </form>

      <h3>All Projects</h3>

      {/* PROJECT LIST */}
      <ul>
        {projects.map(p => (
          <li key={p._id || p.id}>
            <strong>{p.title}</strong>: {p.description}
            {p.link && (
              <a href={p.link} target="_blank" rel="noreferrer">
                {" "} [View]
              </a>
            )}

            {role === 'admin' && p._id && (
              <button
                onClick={() => handleDelete(p._id)}
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

export default Project;

