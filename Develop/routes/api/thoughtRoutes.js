const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtController.js');

// GET all and POST at  /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// GET, PUT, DELETE one thought at /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);


// POST reactions to a thought
router.route('/:thoughtId/reactions').post(addReaction);
// DELETE reactions to a thought
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
