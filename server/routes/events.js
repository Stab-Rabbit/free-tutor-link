const eventsRouter = require('express').Router();
const {
  getAllEvents,
  getEventsByTopic,
  getEventsByTutor,
  getEventsByDate,
  getEventsByStudent,
  addEvent,
  addEventToStudent,
  addEventToTutor,
  addTopicToTutor,
  addTopicToEvent,
  upvoteEvent,
  deleteEvent,
} = require('../controllers/eventsController');

const sendEvents = (req, res) => res.status(200).json(res.locals.events);
const confirmAddition = (req, res) => res.status(201).json(res.locals.event);
const confirmDeletion = (req, res) => res.sendStatus(204);

eventsRouter.get('/all', getAllEvents, sendEvents);
eventsRouter.get('/topic/:topic', getEventsByTopic, sendEvents);
eventsRouter.get('/tutor/:tutor', getEventsByTutor, sendEvents);
eventsRouter.get('/date/:date', getEventsByDate, sendEvents);
eventsRouter.get('/student/:student', getEventsByStudent, sendEvents);
eventsRouter.post('/student/:student', addEventToStudent, confirmAddition);
eventsRouter.post('/tutor/topic/:tutor', addTopicToTutor, confirmAddition);
eventsRouter.post('/tutor/:tutor', addEventToTutor, confirmAddition);
eventsRouter.post('/topic/:event/upvotes', upvoteEvent, confirmAddition);
eventsRouter.post('/topic/:topic', addTopicToEvent, confirmAddition);
eventsRouter.post('/events', addEvent, confirmAddition);
eventsRouter.delete('/events/:event', deleteEvent, confirmDeletion);

module.exports = eventsRouter;
