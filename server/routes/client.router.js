const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

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

module.exports = router;