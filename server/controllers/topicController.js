const db = require('../db');
const topicRouter = {};

topicRouter.getAllTopics = (req, res, next) => {
  const queryString = `SELECT * FROM available_topics`;
  db.queryNew(queryString)
    .then((result) => {
      if (!result.rows.length) {
        console.warn('NO AVAILABLE TOPICS FOUND');
        return next({ code: 404, message: 'NO TOPICS FOUND' });
      }
      res.locals.topics = results.rowsnext();
    })
    .catch((err) => {
      console.error('ERROR GETTING ALL TOPICS');
    });
};

module.exports = topicRouter;
