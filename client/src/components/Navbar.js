import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
  return (
    // Navigation bar with logo and links to all pages
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#282c34',
      padding: '10px 20px',
      color: 'white',
    }}>
      <Logo />
      <ul style={{
        listStyle: 'none',
        display: 'flex',
        marginLeft: '20px',
        gap: '15px',
      }}>
        <li><Link to="/" style={{color: 'white', textDecoration: 'none'}}>Home</Link></li>
        <li><Link to="/about" style={{color: 'white', textDecoration: 'none'}}>About Me</Link></li>
        <li><Link to="/projects" style={{color: 'white', textDecoration: 'none'}}>Projects</Link></li>
        <li><Link to="/education" style={{color: 'white', textDecoration: 'none'}}>Education</Link></li>
        <li><Link to="/services" style={{color: 'white', textDecoration: 'none'}}>Services</Link></li>
        <li><Link to="/contact" style={{color: 'white', textDecoration: 'none'}}>Contacts</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
