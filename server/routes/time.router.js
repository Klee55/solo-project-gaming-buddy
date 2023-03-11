const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/profile/:userId', (req, res) => {
    const userId = req.params.userId;
    const queryText = `SELECT "times"."id", "times"."start_time", "times"."end_time" FROM "user"
    JOIN "times" ON "user"."id" = "times"."user_id"
    WHERE "user"."id" = $1;`;
    pool
        .query(queryText, [userId])
        .then((results) => { res.send(results.rows) })
        .catch((error) => {
            console.log('error with userTime get request:', error);
            res.sendStatus(500);
        })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

    pool
        .connect()
        .then(() => {
            for (let time of req.body) {
                const startTime = time.startTime;
                const endTime = time.endTime;
                const userId = time.user_id;
                const queryText = `INSERT INTO "times" ("start_time", "end_time", "user_id")
                    Values ($1, $2, $3)`
                pool.query(queryText, [startTime, endTime, userId]);
            }
        })
        .then(() => res.sendStatus(201))
        .catch((err) => {
            console.log('time post request failed: ', err);
            res.sendStatus(500);
        });
});

router.post('/userTime', (req, res) => {
    console.log('post userTime request made:', req.body);
    const userId = req.body.user_id;
    const startTime = req.body.startTime;
    const endTme = req.body.endTime;
    const queryText = `INSERT INTO "times" ("start_time", "end_time", "user_id")
            VALUES ($1, $2, $3)`
    pool
        .query(queryText, [startTime, endTme, userId])
        .then(() => res.sendStatus(200))
        .catch((err) => {
            console.log('userTime post quest failed:', err);
        });
})

module.exports = router;