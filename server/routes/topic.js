const topicRouter = require('express').Router();
<<<<<<< HEAD

const { getAllTopics } = require('../controllers/topicController');

topicRouter.get('/all', getAllTopics, (req, res) => res.status(200).json(res.locals.topics));

module.exports = topicRouter;
=======
const { getAllTopics } = require('../controllers/topicController');

topicRouter.get('/all', getAllTopics,(req, res) => {
  res.status(200).json(res.locals.topic);
});

module.exports = topicRouter;
>>>>>>> f3f186f5b0f796ac7457335b665eae8c6797627c
