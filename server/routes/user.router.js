const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const Chance = require('chance');
const chance = new Chance(); 
const transporter = require('../modules/nodemailer'); 
const router = express.Router();
const moment = require('moment'); 

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
router.post('/register', (req, res, next) => {  
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
console.log('posting this user:' + username, password, req.body.email); 
  const queryText = 'INSERT INTO person (username, password, email_address) VALUES ($1, $2, $3) RETURNING id';
  pool.query(queryText, [username, password, req.body.email])
    .then(() => { res.sendStatus(201); })
    .catch((err) => { next(err); });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

//creates a token and expiration for resetting a user's password 
router.put('/createtoken', (req, res) => {
  const email = req.body.email;
  const token = chance.hash();
  const today = req.body.today; 
  const expiration = moment(today).add(48, 'hours').format(); // token expires in 48 hours
  const query = `UPDATE "person" SET "token" = $1, "expiration" = $2 WHERE "email_address" = $3;`;
  pool.query(query, [token, expiration, email]).then((result) => {
    let mail = {
      from: `Fitness Meets Wellness Session Tracker <${process.env.my_gmail_username}>`,
      to: `${email}`,
      subject: "Fitness Meets Wellness Session Tracker password reset",
      text: "You requested a password reset for your Fitness Meets Wellness Session Tracker account.",
      html: `<p>You requested a password reset for your Fitness Meets Wellness Session Tracker account.</p> <p>Click <a href="http://localhost:3000/#/resetpassword/${token}">here</a> to reset your password. This link will expire in 48 hours.</p>`
    }
    transporter.sendMail(mail, function(error, info) {
      if (error) {
        console.log('nodemailer error', info);
      } else {
        console.log("info.messageId: " + info.messageId);
        console.log("info.envelope: " + info.envelope);
        console.log("info.accepted: " + info.accepted);
        console.log("info.rejected: " + info.rejected);
        console.log("info.pending: " + info.pending);
        console.log("info.response: " + info.response);
        res.sendStatus(200);
      }
      transporter.close();
    })
  }).catch((error) => {
    console.log('Error creating token', error);
    res.sendStatus(500); 
  });
})

//resets a user's password if they have the correct token and it has not expired. expiration is also set back to now()
router.put('/resetpassword', (req, res) => {
  const updates = req.body;
  const password = encryptLib.encryptPassword(req.body.password);
  const query = `UPDATE "person" SET "password" = $1, "expiration" = now(), "token" = 'null' WHERE "token" = $2 and "expiration" > now() AND "email_address" = $3;`;
  pool.query(query, [password, updates.token, updates.email_address]).then((results) => {
    res.sendStatus(200);
  }).catch((error) => {
    console.log('Error resetting password', error);
    res.sendStatus(500);
  });
})

module.exports = router;
