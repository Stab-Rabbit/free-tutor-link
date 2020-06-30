const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// router.get('/authCode', loginController.getAccessToken);
router.get('/', loginController.sendToLinkedIn);
router.get(
  '/authCode',
  loginController.getAccessToken,
  loginController.requestAccessToken,
  loginController.setCookie,
  loginController.getNameAndPicture,
  loginController.getUserEmail,
  loginController.getAccessToken, // why is this here again after the first middleware?
  (req, res) => {
    return res.status(200).redirect('http://localhost:8080/home');
  }
);

module.exports = router;
