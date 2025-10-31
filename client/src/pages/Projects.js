import React from 'react';
// list of projects
const projects = [
  {
    title: "My Portfolio",
    image: "logo192.png",
    description: "I created this site using React and implemented functional features to navigate through the site."
  },
  {
    title: "Interest Calculator",
    image: "intcalculator.png",
    description: "I created a project in Eclipse that allows users input of money,interest rate, and number of years to calculate the sum based on the inputs."
  },
  {
    title: "Currency Converter",
    image: "currencyconverter1.jpeg",
    description: " This application is still a work in progress, but it will allow the user to select two currency types, with one being converted into the other, and it will show the exchange rate for the entered amount."
  },
];

const Projects = () => {
  return (
    <div>
      <h1>Projects</h1>
      {projects.map(({ title, image, description }) => (
        <div key={title} style={{marginBottom: '30px'}}>
          <h2>{title}</h2>
          <img src={image} alt={title} style={{width: '300px', height: '150px'}} />
          <p>{description}</p>
        </div>
      ))}
    </div>
  );
};

export default Projects;
