const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET routes
 */
router.get('/', (req, res) => {
    if(req.isAuthenticated()){
        const query = `SELECT *, "sessions"."id" as "session_id" FROM "sessions" JOIN "clients" ON "sessions"."client_id" = "clients"."id" ORDER BY "date" DESC;`; 
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
//deletes all recorded sessions and sets a client's prepaid sessions back down to 0 
router.delete('/clear', (req, res) => {
    if(req.isAuthenticated()){
        (async () => {
            const client = await pool.connect();
            try {
                await client.query('BEGIN');
                console.log(req.query.id);
                let query = `DELETE FROM "sessions" WHERE "client_id" = $1;`;
                await client.query(query, [req.query.id]); 
                query = `UPDATE "clients" SET "sessions" = 0 WHERE "id" = $1;`; 
                console.log(req.query.id);
                await client.query(query, [req.query.id]);
                await client.query('COMMIT');
                    res.sendStatus(200);
            } catch (error){
                console.log('ROLLBACK', error); 
                await client.query('ROLLBACK');
                throw error;
            } finally {
                client.release;
            }
        })().catch((error) => {
            console.log('CATCH', error); 
            res.sendStatus(500); 
        });
    } else {
        res.sendStatus(403); 
    }
})
router.delete('/', (req, res) => {
    if(req.isAuthenticated()){
        const query = `DELETE FROM "sessions" WHERE "id" = $1;`;
        pool.query(query, [req.query.id]).then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error clearing card', error); 
        })
    } else {
        res.sendStatus(403); 
    }
})
// removes all of a client's sessions and then deletes the client. 
router.delete('/remove', (req, res) => {
    if(req.isAuthenticated()){
        ( async() => {
            const client = await pool.connect();
            try {
                await client.query('BEGIN');
                const fitnessClient = req.query.id; 
                console.log(fitnessClient);
                let query = `DELETE FROM "sessions" WHERE "client_id" = $1;`;
                let values = [fitnessClient]; 
                await client.query(query, values); 
                query = `DELETE FROM "clients" WHERE "id" = $1;`; 
                await client.query(query, values); 
                await client.query('COMMIT');
                    res.sendStatus(200); 
            } catch (error) {
                console.log('ROLLBACK', error);
                await client.query('ROLLBACK');
                throw error;
            } finally {
                client.release; 
            }

        })().catch((error) => {
            console.log('CATCH', error);
            res.sendStatus(500); 
        });
    } else {
        res.sendStatus(403); 
    }
})
module.exports = router;