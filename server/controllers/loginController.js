const db = require('../db.js');
const dotenv = require('dotenv').config();
const request = require('superagent');
const { setCookie } = require('./requests/requests.js');
const CLIENT_ID = process.env.CLIENT_ID; // '77iojwzvr5axo9';
const CLIENT_SECRET = process.env.CLIENT_SECRET; // '2Ul4nGyuuFbylkm5';
const REDIRECT_URI = process.env.REDIRECT_URI; // 'http://localhost:3000/login/authCode';

const loginController = {};

loginController.sendToLinkedIn = (req, res) =>
  res.redirect(
    `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=r_liteprofile%20r_emailaddress`
  );

loginController.getAccessToken = (req, res, next) => {
  const { code } = req.query;
  res.locals.code = code;
  return next();
};

loginController.requestAccessToken = (req, res, next) => {
  // make a post request with access token
  request.post(
    `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${res.locals.code}&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
  )
  .then((accessRes) => {
    const { access_token } = accessRes.body;
    res.locals.access_token = access_token;
    return next();
  })
  .catch(err => console.error('err at requestAccessToken:', err));
};

loginController.setCookie = (req, res, next) => {
  res.cookie('accessToken', res.locals.access_token, { httpOnly: true, secure: true });
  return next();
}

loginController.getNameAndPicture = (req, res, next) => {
  request.get('https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))')
  .set('Authorization', `Bearer ${res.locals.access_token}`)
  .then((userRes) => {
    const firstName = Object.values(userRes.body.firstName.localized)[0];
    const lastName = Object.values(userRes.body.lastName.localized)[0];
    const imgUrl = userRes.body.profilePicture['displayImage~'].elements[0].identifiers[0].identifier;
    const newUser = {
      name: `${firstName} ${lastName}`,
      imgUrl,
      }
    res.locals.newUser = newUser;
    return next();
    })
  .catch(err => console.error('err at getNameAndPicture:', err));
};

loginController.getUserEmail = (req, res, next) => {
  request.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))')
  .set('Authorization', `Bearer ${res.locals.access_token}`)
  .then((emailRes) => {
    const email = emailRes.body.elements[0]['handle~'].emailAddress;
    // save everything to db
    const sqlQuery = `INSERT INTO tutors (email, name, photo) VALUES ($1, $2, $3)`;
    db.query(sqlQuery, [email, res.locals.newUser.name, res.locals.newUser.imgUrl])
    return next();
  })
  .catch(err => console.error('err at getUserEmail:', err))
};

module.exports = loginController;
