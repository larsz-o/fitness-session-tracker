const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const transporter = require('../modules/nodemailer');

/**
 * GET routes 
 */
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        const query = `SELECT * FROM "clients" WHERE "person_id" = $1 ORDER BY "last_name" ASC;`;
        pool.query(query, [req.user.id]).then((results) => {
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
        const user = req.user.id;
        console.log('posting a new client for' + user); 
        const client = req.body;
        const query = `INSERT INTO "clients" ("first_name", "last_name", "email_address", "sessions", "person_id") VALUES ($1, $2, $3, $4, $5);`;
        pool.query(query, [client.first_name, client.last_name, client.email_address, client.sessions, user]).then((results) => {
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
    if(req.isAuthenticated()){
     let mail = {
        from: `Fitness Meets Wellness <${req.user.email_address}>`,
        to: `${req.body.recipient}`,
        subject: 'Fitness Meets Wellness Session Renewal Reminder',
        text: `Hi ${req.body.name}! 
        Just a reminder that your prepaid sessions are almost complete. You have ${req.body.sessionsLeft} more sessions until your card is full. 
        You can renew your sessions in the studio  at your convenience. Thank you for your continued support and great efforts on your fitness goals! See you soon!
        Be well!   
        Sue Mackenzie`,
        html: `<p>Hi ${req.body.name}! </p>
        <p>Just a reminder that your prepaid sessions are almost complete. You have ${req.body.sessionsLeft} more sessions until your card is full.</p> 
        <p> You can renew your sessions in the studio  at your convenience. Thank you for your continued support and great efforts on your fitness goals! See you soon!</p>
        <p>Be well!</p><p>Sue Mackenzie</p>`
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
/**
 * PUT routes 
 */
router.put('/', (req, res) => {
    if(req.isAuthenticated()){
        const client = req.body;
        const query = `UPDATE "clients" SET "first_name" = $1, "last_name" = $2, "email_address" = $3, "sessions" = $4 WHERE "id" = $5;`; 
        pool.query(query, [client.first_name, client.last_name, client.email_address, client.sessions, client.id]).then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error updating client', error);
            res.sendStatus(500); 
        })
    } else {
        res.sendStatus(403); 
    }
})
module.exports = router;