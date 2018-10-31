const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET routes 
 */
router.get('/', (req, res) => {
    if(req.isAuthenticated()){
        const query = `SELECT * FROM "clients";`; 
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

});

module.exports = router;