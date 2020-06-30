const db = require('../db');

const topicController = {};

topicController.getAllTopics = (req, res, next) => {
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

module.exports = topicController;
