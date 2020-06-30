import React, { useState, useEffect } from 'react';
import EventsContainer from './EventsContainer';
import TopicDropdown from './TopicDropdown';

const topics = ['React', 'Redux', 'React Router', 'NodeJS', 'Express'];

const Main = (props) => {
  const { setIsLoggedIn } = props;
  const [events, setEvents] = useState([]);

  const getAllEvents = () => {
    fetch('/events/all')
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setEvents(data);
      })
      .catch(console.error);
  };

  useEffect(() => {
    setIsLoggedIn(true);
    getAllEvents();
  }, []);

  return (
    <div>
      <TopicDropdown topics={topics} setEvents={setEvents} />
      <EventsContainer events={events} />
    </div>
  );
};

export default Main;
