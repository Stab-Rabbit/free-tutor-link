import React, { useState, useEffect } from 'react';
import EventsContainer from './EventsContainer';
import TopicDropdown from './TopicDropdown';

const topics = ['React', 'Redux', 'React Router', 'NodeJS', 'Express'];

const consolidateTopics = (events) => {
  return events.reduce((acc, event) => {
    if (acc[event.event_id]) {
      acc[event.event_id].topics.push(event.topic);
    } else {
      acc[event.event_id] = { ...event, topics: [event.topic] };
    }
    return acc;
  }, []);
};

const Main = (props) => {
  const { setIsLoggedIn } = props;
  const [events, setEvents] = useState([]);

  const getAllEvents = () => {
    fetch('/events/all')
      .then((resp) => resp.json())
      .then((data) => {
        data = consolidateTopics(data);
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
