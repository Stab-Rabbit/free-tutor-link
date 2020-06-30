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
tutorsRouter.get('/all', getAllTopics,(req, res) => {
  res.status(200).json(res.locals.topic);
});
tutorsRouter.get('/all', getAllEvents, (req, res) => {
  res.status(200).json(res.locals.events);
});
tutorsRouter.post('/events/:student', postStudentEvents,(req, res) => {
  res.status(200).json(res.locals.student);
});
tutorsRouter.delete('/events', deleteEvent, (req, res) => {
  res.status(200).json(res.locals.student);
})
module.exports = tutorsRouter;
