import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/signin');
  };

  return (
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

        {!token && (
          <>
            <li><Link to="/signin" style={{color: 'white', textDecoration: 'none'}}>Sign In</Link></li>
            <li><Link to="/signup" style={{color: 'white', textDecoration: 'none'}}>Sign Up</Link></li>
          </>
        )}

        {token && (
          <>
            {role === 'admin' && (
              <li><Link to="/admin" style={{color: 'white', textDecoration: 'none'}}>Admin Panel</Link></li>
            )}
            <li>
              <button onClick={handleSignOut} style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer'}}>
                Sign Out
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

