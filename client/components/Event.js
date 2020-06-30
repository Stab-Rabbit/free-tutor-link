import React from 'react';
import TutorImage from './eventsPage/TutorImage';
import EventDetails from './eventsPage/EventDetails';
import { useParams } from 'react-router-dom';

const EventsPage = () => {
  const { id } = useParams();

  return (
    <div>
      Event! {id}
      {/* <TutorImage />
            <EventDetails /> */}
    </div>
  );
};

export default EventsPage;
