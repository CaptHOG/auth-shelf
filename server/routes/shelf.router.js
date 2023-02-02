const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  
  const sqlQuery = `SELECT * FROM item;`;

  pool.query(sqlQuery)
  .then(result => {
    const items = result.rows;
    console.log("GET - All items:", items);
    res.send(items);
  }).catch(error => {
    console.log('ERROR in /api/shelf GET route', error);
    res.sendStatus(500)
  })

});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/',  (req, res) => {
  let itemToSend = req.body;
  // endpoint functionality
  const sqlQuery = `
  INSERT INTO "item" ("description", "image_url", "user_id")
    VALUES($1 , $2 , $3);`
  const sqlValues = [itemToSend.description , itemToSend.image_url, itemToSend.user_id]

  pool.query(sqlQuery, sqlValues)
      .then((dbRes) => {
          res.sendStatus(201);
      })
      .catch((dbErr) => {
          console.log(`error in POST: serverside`, dbErr);
          res.sendStatus(500);
      });

});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  let itemId = req.params.id
  // if logged in you can access user.id
  let userId = req.user.id

  console.log('req.params', userId)
  console.log('req.body', itemId)

  let sqlValues = [itemId, userId]
  let sqlQuery = `
  DELETE
  FROM "item"
	  WHERE "item"."id" = $1
	    AND "item"."user_id" = $2`;

      pool.query(sqlQuery, sqlValues)
      .then((dbRes) => {
        console.log('dbRes.rows', dbRes.rows)
          res.sendStatus(200);
      })
      .catch((dbErr) => {
          console.log(`error in POST: serverside`, dbErr);
          res.sendStatus(500);
      });



    });



/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
