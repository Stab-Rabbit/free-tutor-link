const db = require('../db.js');
const iterationController = {};

iterationController.getAllTutors = (req, res, next) => {
  const query = `SELECT name FROM tutors`;
  db.queryNew(query)
  .then((data) => {
    // TODO: How to handle data
    console.log(data);
  })
  .catch((err) => {
    return next({
    log:
      "iterationController.getAllTutors: ERROR: Error getting skill data from the database",
    message: {
      err:
        "iterationController.getAllTutors: ERROR: Check server logs for details",
      },  
    })
  });
}

iterationController.allTutorsTopic = (req, res, next) => {
  
}