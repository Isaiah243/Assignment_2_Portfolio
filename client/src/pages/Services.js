import React from 'react';

// List of services offered
const services = [
  {
    title: "Web Development",
    image: "webdev.jpeg",
    description: "Creating modern websites using React, HTML, CSS, and JavaScript.",
  },
  {
    title: "General Programming",
    image: "generalprogramming.jpeg",
    description: "Making custom software solutions tailored to the needs of the client.",
  },
];

const Services = () => {
  return (
    <div style={{ padding: '40px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Services</h1>
      <div style={{
        display: 'flex',
        gap: '40px',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}>
        {services.map(({ title, image, description }) => (
          <div key={title} style={{
            textAlign: 'center',
            width: '250px',
            padding: '20px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            backgroundColor: '#fff',
          }}>
            <img
              src={image}
              alt={title}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '4px',
                marginBottom: '15px'
              }}
            />
            <h3 style={{ margin: '10px 0' }}>{title}</h3>
            <p style={{ fontSize: '14px', color: '#555' }}>{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
