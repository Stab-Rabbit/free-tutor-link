const topicRouter = require('express').Router();

const { getAllTopics } = require('../controllers/topicController');

topicRouter.get('/all', getAllTopics, (req, res) => res.status(200).json(res.locals.topics));

module.exports = topicRouter;
