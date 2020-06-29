const request = require('superagent');
const db = require('../db.js');
const dotenv = require('dotenv').config();

const loginController = {};

const CLIENT_ID = process.env.CLIENT_ID; // '77iojwzvr5axo9';
const CLIENT_SECRET = process.env.CLIENT_SECRET; // '2Ul4nGyuuFbylkm5';
const REDIRECT_URI = process.env.REDIRECT_URI; // 'http://localhost:3000/login/authCode';

loginController.sendToLinkedIn = (req, res) =>
  res.redirect(
    `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=r_liteprofile%20r_emailaddress`
  );

loginController.getAccessToken = (req, res, next) => {
  const { code } = req.query;

  request
    .post(
      `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${code}&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    )
    .then((accessRes) => {
      res.locals.accessToken = accessRes.body.access_token;
      res.cookie('accessToken', res.locals.accessToken, { httpOnly: true, secure: true });
      console.log('lev1', res.locals.accessToken);
      return request
        .get(
          'https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))'
        )
        .set('Authorization', `Bearer ${res.locals.accessToken}`);
    })
    .then((userRes) => {
      console.log(userRes.body);
      const firstName = Object.values(userRes.body.firstName.localized)[0];
      const lastName = Object.values(userRes.body.lastName.localized)[0];
      const { id } = userRes.body;
      const imgUrl =
        userRes.body.profilePicture['displayImage~'].elements[0].identifiers[0].identifier;
      res.locals.newUser = {
        name: `${firstName} ${lastName}`,
        //  userid: id,
        imgUrl,
      };
      return request
        .get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))')
        .set('Authorization', `Bearer ${res.locals.accessToken}`);
    })
    .then((emailRes) => {
      const email = emailRes.body.elements[0]['handle~'].emailAddress;
      res.locals.newUser.email = email;
      console.log('newUser info: ', res.locals.newUser);
      // add user to database
      const userData = res.locals.newUser;
      const sqlQuery = `INSERT INTO tutors (email, name, photo) VALUES ($1, $2, $3)`;
      db.query(sqlQuery, [userData.email, userData.name, userData.imgUrl]).then(() => {
        console.log('WORKINGGGG!');
        // const sqlQuery = `SELECT _id FROM tutors where order`
        // db
        // .query(sqlQuery)
      });
      // cookies?
      return res.redirect('http://localhost:8080/home');
    })
    .catch((err) => {
      return next({
        log: `Error in loginController.getAccessToken: ${err}`,
      });
    });
};

module.exports = loginController;
