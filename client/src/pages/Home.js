import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to My Portfolio!</h1>
      <p>This is my portfolio website, where you can learn about me, my projects, education, and the services I offer.</p>
      <p>My mission or goal is to continue learning about software development and its processes and to continue growing as a developer.</p>
      <Link to="/about">
        <button style={{padding: '10px 20px', cursor: 'pointer'}}>Learn More About Me</button>
      </Link>
    </div>
  );
};

export default Home;
