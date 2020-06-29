import React, { useEffect } from 'react';

const skillSetSelection = (props) => {
  const checkbox = [];
  checkbox.push(props.skills);
  return (
    <div>
      <h3>Skill Set</h3>
      <div>{checkbox}</div>
      <button>Save Skills</button>
    </div>
  );
};

export default skillSetSelection;
