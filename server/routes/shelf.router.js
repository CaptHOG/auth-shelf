const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  res.sendStatus(200); // For testing only, can be removed
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
  let userId = req.body.user_id
  // const sqlQuery = `DELETE FROM "item"
	//   WHERE  "user_id" = $1`;
});

// const sqlValues = [userId]

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
