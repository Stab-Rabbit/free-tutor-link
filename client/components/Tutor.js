import React from 'react';
import { useParams } from 'react-router-dom';

const TutorPage = (props) => {
  const { id } = useParams();

  return <div>Here is the tutor</div>;
};

export default TutorPage;
