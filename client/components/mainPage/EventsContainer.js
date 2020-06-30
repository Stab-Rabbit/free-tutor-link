import React from 'react';
import EventCard from './EventCard';

const EventsContainer = (props) => {
  const { events } = props;
  if (!events.length) return <div></div>;
  return (
    <div className='events-container'>
      {events.map((event) => (
        <EventCard {...event} />
      ))}
    </div>
  );
};

export default EventsContainer;
