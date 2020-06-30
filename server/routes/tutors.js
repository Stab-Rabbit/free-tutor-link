const tutorsRouter = require('express').Router();
const { getAllTutors, getTutorsByTopic } = require('../controllers/tutorsController');

// return an array of all available tutors
tutorsRouter.get('/all', getAllTutors, (req, res) => {
  res.status(200).json(res.locals.tutors);
});
// /tutors/topic/express
// req.params.topic = express
tutorsRouter.get('/topic/:topic', getTutorsByTopic, (req, res) => {
  res.status(200).json(res.locals.tutors);
});

module.exports = tutorsRouter;
