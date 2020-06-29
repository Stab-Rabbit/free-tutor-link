const request = require('superagent');
const dotenv = require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID; // '77iojwzvr5axo9';
const CLIENT_SECRET = process.env.CLIENT_SECRET; // '2Ul4nGyuuFbylkm5';
const REDIRECT_URI = process.env.REDIRECT_URI; // 'http://localhost:3000/login/authCode';

const requestAccessToken = (code) => {
  return request.post(
    `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${code}&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
  );
};

const getNameAndPicture = (accessToken) => {
  return request
    .get(
      'https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))'
    )
    .set('Authorization', `Bearer ${accessToken}`);
};

const getUserEmail = (access_token) => {
  return request
    .get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))')
    .set('Authorization', `Bearer ${access_token}`);
};

const setCookie = (res, accessToken) => {
  return res.cookie('accessToken', accessToken, { httpOnly: true, secure: true });
};

module.exports = { requestAccessToken, getUserEmail, setCookie, getNameAndPicture };
