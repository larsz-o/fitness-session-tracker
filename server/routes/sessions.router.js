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
router.get('/reminders', (req, res) => {
    if(req.isAuthenticated){
        const query = `SELECT * FROM "reminders" WHERE "trainer_id" = $1;`
        pool.query(query, [req.user.id]).then((results) => {
            res.send(results.rows);
        })
    } else {
        res.sendStatus(403);
    }
})

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

router.post('/reminders', (req, res) => {
    if(req.isAuthenticated()){
        const id = req.query.id;
        const today = new Date();
        (async () => {
            const client = await pool.connect();
            try {
                let query = `SELECT * FROM "reminders" WHERE "client_id" = $1;`;
                let response = await client.query(query, [id]);
                console.log(response); 
                if (response.rows.length > 0){
                    console.log('Reminder record exists');
                    query = `UPDATE "reminders" SET "date" = $1, "active" = true WHERE "client_id" = $2;`;
                    await client.query(query, [today, id]);
                    await client.query('COMMIT');
                    res.sendStatus(201);
                } else {
                    query = `INSERT INTO "reminders" ("client_id", "date", "active", "trainer_id") VALUES ($1, $2, $3, $4) `;
                    await client.query(query, [id, today, true, id]);
                    await client.query('COMMIT');
                    res.sendStatus(201);
                }
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


//deletes all recorded sessions and sets a client's reminder status to false (clearing any reminders from the card)
router.delete('/clear', (req, res) => {
    if(req.isAuthenticated()){
        (async () => {
            const client = await pool.connect();
            try {
                await client.query('BEGIN');
                let query = `DELETE FROM "sessions" WHERE "client_id" = $1;`;
                await client.query(query, [req.query.id]); 
                query = `UPDATE "reminders" SET "active" = false WHERE "client_id" = $1;`; 
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
                let query = `DELETE FROM "sessions" WHERE "client_id" = $1;`;
                let values = [fitnessClient]; 
                await client.query(query, values); 
                query = `DELETE FROM "clients" WHERE "id" = $1 AND "person_id" = $2;`; 
                values = [fitnessClient, req.user.id]
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