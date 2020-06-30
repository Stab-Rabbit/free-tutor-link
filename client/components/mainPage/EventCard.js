import React from 'react';
import { Link } from 'react-router-dom';

// incorporate reducer to accumulate topics

const EventCard = (props) => {
  console.log(props);
  const { event_id, event_name, time, topics, name, image_url } = props;
  return (
    <div>
      <ul>
        <li>
          <img className='tutor-pic' src={image_url} alt={name} />
        </li>
        <li className='event-name'>
          <Link to={`/events/${event_id}`}>
            <span>Event: </span>
            {event_name}
          </Link>
        </li>
        <li className='event-time'>
          <span>Time: </span>
          {time}
        </li>
        <li className='event-tutor'>
          <Link to={`/tutor/${name}`}>
            <span>Tutor: </span>
            {name}
          </Link>
        </li>
        <li className='event-topics'>
          <span>Topics: </span>
          {topics?.length && topics.join(', ')}
        </li>
      </ul>
    </div>
  );
};

export default EventCard;
