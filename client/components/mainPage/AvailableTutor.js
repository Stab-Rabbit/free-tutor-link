import React from 'react';

const AvailableTutor = (props) => {
  console.log('props:', props);
  return (
    <div>
      <span>
        <a href={props.linkedInUrl}>
          <img src={props.imgUrl} alt={props.name} />
        </a>
      </span>
      <span>{props.name}</span>
      {/* <span>{props.date}</span> */}
      <span>
        {props.startTime} to {props.endTime}
      </span>
      <span>
        <a href={`mailto: ${props.email}`}>Send an Email</a>
      </span>
    </div>
  );
};

export default AvailableTutor;
