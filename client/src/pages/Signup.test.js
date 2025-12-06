import React from 'react';
import { render, screen } from '@testing-library/react';
import Signup from './Signup'; 

test('renders signup form', () => {
  render(<Signup />);
  
  const headingElement = screen.getByText(/Sign Up/i);
  expect(headingElement).toBeInTheDocument();
});
