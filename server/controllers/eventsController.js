const db = require('../db');

const getEvents = (queryString, req, res, next) => {
  db.queryNew(queryString)
    .then((result) => {
      if (!result.rows.length) {
        console.warn('No results found for the following query: \n', queryString);
        return next({ code: 404, message: 'NO RESULTS FOUND' });
      }
      res.locals.events = result.rows;
      next();
    })
    .catch((err) => {
      console.error('error in query: ', queryString, '\n', err);
    });
};

const addEvent = (queryString, req, res, next) => {
  db.queryNew(queryString)
    .then((result) => {
      if (!result.rows.length) {
        console.error('NO RESULT ADDED', queryString);
        return next({ code: 404, message: 'ERROR ADDING EVENT' });
      }
      res.locals.event = result.rows[0];
      next();
    })
    .catch((err) => {
      console.error('error in query: ', queryString, '\n', err);
    });
};

const eventsController = {};

/*

MIDDLEWARES: 

Get all events
Get list of topics by event_id
Get tutor by event_id



*/

eventsController.getAllEvents = (req, res, next) => {
  const queryString = `SELECT e.*, a.topic, tutors.* FROM events e LEFT JOIN event_topics t ON e.event_id = t.event_id FULL OUTER JOIN available_topics a ON t.topic_id = a.topic_id INNER JOIN tutors ON tutors.tutor_id = e.tutor_id`;
  getEvents(queryString, req, res, next);
};


eventsController.getEventsByTopic = (req, res, next) => {
  const { topic } = req.params;
  const queryString = `SELECT * FROM events e INNER JOIN tutor_topics t ON e.tutor_id = t.tutor_id INNER JOIN available_topics a ON t.topic_id = a.topic_id WHERE a.topic = '${topic}';`;
  // TODO: FIGURE THIS OUT -> figured out(?)
  getEvents(queryString, req, res, next);
};

eventsController.getEventsByTutor = (req, res, next) => {
  const { tutor } = req.params;
  const queryString = `SELECT * FROM events e INNER JOIN tutors t ON e.tutor_id = t.tutor_id WHERE t.name = '${tutor}'`; // TODO: FIGURE THIS OUT
  getEvents(queryString, req, res, next);
};

// TODO: Dropdown filter events by topic

// get event by id -> should return specific event
// EventDetails component
eventsController.getEventsByEvent = (req, res, next) => {
  const { event } = req.params;
  const queryString = `SELECT * FROM events e WHERE e.event_name = '${event}'`; // TODO: FIGURE THIS OUT
  getEvents(queryString, req, res, next);
};

// END OF WHERE WE WORKED ON

eventsController.getEventsByDate = (req, res, next) => {
  const { date } = req.params;
  const queryString = `SELECT * FROM events WHERE  time = ${date}; `; // TODO: FIGURE THIS OUT
  getEvents(queryString, req, res, next);
};
eventsController.getEventsByStudent = (req, res, next) => {
  const { student } = req.params;
  const queryString = `SELECT * FROM events WHERE   `; // TODO: FIGURE THIS OUT
  getEvents(queryString, req, res, next);
};
eventsController.addEvent = (req, res, next) => {
  const { tutor_id, time } = req.body;
  const queryString = `INSERT INTO events (tutor_id, time) VALUES ('${tutor_id}', '${time}');`; // TODO: FIGURE THIS OUT
  addEvent(queryString, req, res, next);
};
eventsController.addEventToStudent = (req, res, next) => {
  const { student } = req.params;
  const { event_id } = req.body;
  const queryString = ``;
  addEvent(queryString, req, res, next);
};
eventsController.addEventToTutor = (req, res, next) => {
  const { tutor } = req.params;
  const { event_id } = req.body;
  const queryString = `INSERT INTO events (event_id, tutor_id) VALUES ('${event_id}', '${tutor}');`;
  addEvent(queryString, req, res, next);
};
eventsController.addTopicToEvent = (req, res, next) => {
  const { topic } = req.params;
  const { event_id } = req.body;
  const queryString = `INSERT INTO event_topics (event_id, topic_id) VALUES ('${event_id}', '${topic}');`;
  addEvent(queryString, req, res, next);
};
eventsController.addTopicToTutor = (req, res, next) => {
  const { tutor } = req.params;
  const { topic } = req.body;
  const queryString = `INSERT INTO tutor_topics (tutor_id, topic_id) VALUES ('${tutor}', '${topic}');`;
  addEvent(queryString, req, res, next);
};
eventsController.upvoteEvent = (req, res, next) => {
  const { event } = req.params;
  const { upvote, topic } = req.body;
  let queryString;
  if (upvote === 'UPVOTE') {
    queryString = `UPDATE upvotes SET upvotes = upvotes + 1 WHERE event_id = '${event}' AND topic_id = '${topic}';`;
  } else if (upvote === 'DOWNVOTE') {
    queryString = `UPDATE upvotes SET upvotes = upvotes - 1 WHERE event_id = '${event}' AND topic_id = '${topic}';`;
  } else {
    console.warn('UPVOTE REQUEST MUST BE EITHER UPVOTE OR DOWNVOTE');
    return next({ code: 400, message: 'UPVOTE REQUEST MUST EITHER BE UPVOTE OR DOWNVOTE' });
  }
  addEvent(queryString, req, res, next);
};
eventsController.deleteEvent = (req, res, next) => {
  const queryString = ``;
  deleteEvent(queryString, req, res, next);
};

module.exports = eventsController;
