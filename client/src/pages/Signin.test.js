import React from 'react';
import { render, screen } from '@testing-library/react';
import Signin from './Signin'; 

test('renders signin form', () => {
  render(<Signin />);
  
  const headingElement = screen.getByText(/Sign In/i);
  expect(headingElement).toBeInTheDocument();
});
