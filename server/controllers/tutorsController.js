const db = require('../db');

const tutorsController = {};

tutorsController.getAllTutors = (req, res, next) => {
  // what are we going to want to show on the front end?
  // name, topics, events

  // get the name from the tutors table
  // get the topics from the available_topics JOINED to the tutor_topics TABLE JOINED to the available_topics TABLE
  // get the events from the events table, filtered by tutor_id
  const queryString = `SELECT name FROM tutors`; // TODO: talk to database team about this
  db.queryNew(queryNewString)
    .then((result) => {
      if (!result.rows.length) {
        return next({ code: 404, message: 'NO TUTORS FOUND IN THE DATABASE' });
      }
      res.locals.tutors = result.rows;
      next();
    })
    .catch((err) => console.error('error retrieving all tutors', err));
};

tutorsController.getTutorsByTopic = (req, res, next) => {
  const { topic } = req.params;
  const queryString = `SELECT name FROM tutors WHERE `; // TODO: talk to dB about how to search by topic
  db.queryNew(queryString)
    .then((result) => {
      if (!result.rows.length) {
        return next({ code: 404, message: 'COULD NOT FIND TUTORS BY TOPIC' });
      }
      res.locals.tutors = result.rows;
      next();
    })
    .catch((err) => console.error('error retrieving tutors by topic', err));
};
tutorsController.getAllTopics = (req, res, next) => {
  const queryString = `SELECT topic*`;
  db.query(queryString)
  .then((result) => {
    if (!result.rows.length) {
      return next({code: 404, message: 'COULD NOT FIND ALL TOPICS'});
    }
    res.locals.topic = result.rows;
      next();
  })
    .catch((err) => console.error('errors retrieving all topics', err));
}
tutorsController.getAllEvents = (req, res, next) => {
  const queryString = `SELECT events*`;
  db.query(queryString)
  .then((result) => {
    if(!result.rows.length) {
      return next({code: 404, message: 'COULD NOT FIND ALL EVENTS'});
    }
    res.locals.topic = results.rows;
    next();
  })
  .catch((err) => console.error('errors retrieving all events', err));
}
tutorsController.postStudentEvents =(req, res, next) => {
  const { student } = req.params;
  const queryString = `SELECT events`;
  db.query(queryString)
  .then((result) => {
    if(!result.rows.length) {
      return next({code: 404, message: 'COULD NOT FIND STUDENT EVENTS'});
    }
    res.locals.topic = result.rows;
    next();
  })
  .catch((err) => console.error('error retrieving student events', err));
}
// tutorsController.deleteEvent = (req, res, next) => {
//   const queryString = `DELETE events`;
//   db.query(queryString) 
//   .then((result) => {
//     if(!result.rows.length) {
//       return next({code: 404, message: 'COULD NOT DELETE EVENT'});
//     })
//     .catch((err) => console.error('error deleting event', err));
//   })
// }
module.exports = tutorsController;

/*

data = DATA THAT I WANT TO MOVE TO THE NEXT MIDDLEWARE

response = {
    ...tonofstuff,
    locals: {
        tutors: Array<{}>
    }
}

*/
