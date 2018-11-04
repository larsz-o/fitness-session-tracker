const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const transporter = require('../modules/nodemailer');

/**
 * GET routes 
 */
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        const query = `SELECT * FROM "clients" ORDER BY "last_name" DESC;`;
        pool.query(query).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('Error getting clients', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

/**
 * POST routes 
 */
router.post('/', (req, res) => {
    if (req.isAuthenticated()) {
        const client = req.body;
        const query = `INSERT INTO "clients" ("first_name", "last_name", "phone_number", "email_address") VALUES ($1, $2, $3, $4);`;
        pool.query(query, [client.first_name, client.last_name, client.phone_number, client.email_address]).then((results) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('Error posting client', error); 
            res.sendStatus(500); 
        })
    } else {
        res.sendStatus(403);
    }
});
router.post('/email', (req, res) => {
    if(req.isAuthenticated){
     console.log(req.body);
     let mail = {
        from: `Fitness Meets Wellness <${process.env.my_gmail_username}>`,
        to: `${req.body.recipient}`,
        subject: 'Personal Training Session Renewal Reminder',
        text: `Hi ${req.body.name}! 
        I hope you have enjoyed our personal training sessions. I'm writing to let you know that you just finished your prepaid fitness sessions. Nice work! 
        If you'd like to sign up for more, you can do so by calling me at (508) 366-8700 or by dropping by the studio. 
        Thanks for being a great client! From, Sue Mackenzie Fitness Meets Wellness`,
        html: `<p>Hi ${req.body.name}! </p>
        <p>I hope you have enjoyed our personal training sessions. I'm writing to let you know that you just finished ${req.body.sessionsCompleted} of your ${req.body.sessionsTotal} prepaid fitness sessions. Nice work!</p> 
        <p>If you'd like to sign up for more, you can do so by calling me at (508) 366-8700 or by dropping by the studio.</p>
        <p>Thanks for being a great client!</p><p> From,<br/> Sue Mackenzie<br/> Fitness Meets Wellness</p>`
     }
     transporter.sendMail(mail, function(error, info) {
         if (error) {
             console.log('nodemailer error', error);
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
        });
    } else {
        res.sendStatus(403); 
    }
})

module.exports = router;