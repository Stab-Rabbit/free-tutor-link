import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = (props) => {
  const { event_id, event_name, time, topics, name } = props;
  return (
    <div>
      <ul>
        <li className='event-name'>
          <Link to={`/events/${event_id}`}>Event: {event_name}</Link>
        </li>
        <li className='event-time'>Time: {time}</li>
        <li className='event-tutor'>
          <Link to={`/tutor/${name}`}>Tutor: {name}</Link>
        </li>
        <li className='event-topics'>
          Topics:
          {topics?.length && topics.map((topic) => topic.name).join(', ')}
        </li>
      </ul>
    </div>
  );
};

export default EventCard;
