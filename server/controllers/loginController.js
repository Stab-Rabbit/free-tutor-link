const db = require('../db.js');
const dotenv = require('dotenv').config();

const {
  requestAccessToken,
  setCookie,
  getNameAndPicture,
  getUserEmail,
} = require('./requests/requests');

const loginController = {};

const CLIENT_ID = process.env.CLIENT_ID; // '77iojwzvr5axo9';
const REDIRECT_URI = process.env.REDIRECT_URI; // 'http://localhost:3000/login/authCode';

loginController.sendToLinkedIn = (req, res) =>
  res.redirect(
    `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=r_liteprofile%20r_emailaddress`
  );

loginController.getAccessToken = (req, res, next) => {
  // linked in is going to send us a code on query params
  const { code } = req.query;

  // send this code to linked in, get back an access token
  requestAccessToken(code)
    .then((accessRes) => {
      // returns access token on the response body
      const { access_token } = accessRes.body;
      setCookie(res, access_token);
      // request the name and picture of the user, sends access token to linked in
      getNameAndPicture(access_token)
        .then((userRes) => {
          const firstName = Object.values(userRes.body.firstName.localized)[0];
          const lastName = Object.values(userRes.body.lastName.localized)[0];
          const imgUrl =
            userRes.body.profilePicture['displayImage~'].elements[0].identifiers[0].identifier;
          const newUser = {
            name: `${firstName} ${lastName}`,
            imgUrl,
          };
          // request email of the user from linked in
          getUserEmail(access_token)
            .then((emailRes) => {
              const email = emailRes.body.elements[0]['handle~'].emailAddress;

              // save everything to db
              const sqlQuery = `INSERT INTO tutors (email, name, photo) VALUES ($1, $2, $3)`;
              db.query(sqlQuery, [email, newUser.name, newUser.imgUrl]).then((err, result) => {
                if (err) return console.error(err);
                return res.redirect('http://localhost:8080/home');
              });
            })
            .catch((err) => console.error('error in the get user email', err));
        })
        .catch((err) => console.error('error in get name and picture:', err));
    })
    .catch((err) => {
      console.error('error in request access token', err);
    });
};

module.exports = loginController;
