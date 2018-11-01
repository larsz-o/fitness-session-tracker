const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET routes
 */
router.get('/', (req, res) => {
    if(req.isAuthenticated()){
        //will need to join to get more information here about the client 
        const query = `SELECT * FROM "sessions";`; 
        pool.query(query).then((results) => {
            res.send(results.rows); 
        }).catch((error) => {
            console.log('Error getting sessions', error);
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
    if(req.isAuthenticated()){
        const session = req.body;
        const query = `INSERT INTO "sessions" ("date", "client_id") VALUES ($1, $2);`;
        pool.query(query, [session.date, session.client]).then((results) => {
            res.sendStatus(201); 
        }).catch((error) => {
            console.log('Error posting session', error); 
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403); 
    }
});

module.exports = router;