import React from 'react';

const About = () => {
  return (
    <div>
      <h1>About Me</h1>
      <img 
        src="/Avatar.png" 
        alt="Headshot" 
        style={{ borderRadius: '50%', marginBottom: '20px' }} 
      />
      <p>
        My name is Isaiah Irisapen. I am a student at Centennial College and I am in the Software Engineering program. I am a student software developer and I am trying to gain experience in React, Node.js, and more to become a better developer.
      </p>
      <p>
        <a href="/resume1.0.pdf" target="_blank" rel="noopener noreferrer">
          Download my Resume (PDF)
        </a>
      </p>
    </div>
  );
};

export default About;
