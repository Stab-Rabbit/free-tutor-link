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
  db.query(queryString)
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

eventsController.getAllEvents = (req, res, next) => {
  const queryString = `SELECT * FROM events`;
  getEvents(queryString, req, res, next);
};
eventsController.getEventsByTopic = (req, res, next) => {
  const { topic } = req.params;
  const queryString = `SELECT * FROM events WHERE `; // TODO: FIGURE THIS OUT
  getEvents(queryString, req, res, next);
};
eventsController.getEventsByTutor = (req, res, next) => {
  const { tutor } = req.params;
  const queryString = `SELECT * FROM events WHERE `; // TODO: FIGURE THIS OUT
  getEvents(queryString, req, res, next);
};
eventsController.getEventsByDate = (req, res, next) => {
  const { date } = req.params;
  const queryString = `SELECT * FROM events WHERE   `; // TODO: FIGURE THIS OUT
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
