import React from 'react';

const educationData = [
    { year: "2021", degree: "Highschool Diploma", institution: "St George H.S" },
  { year: "2023 - present", degree: "Diploma in Software Engineering", institution: "Centennial College" },
];

const Education = () => {
  return (
    <div>
      <h1>Education</h1>
      <ul>
        {educationData.map(({ year, degree, institution }) => (
          <li key={degree}>
            <strong>{year}:</strong> {degree} from {institution}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Education;
