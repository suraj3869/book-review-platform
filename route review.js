const express = require('express');
const { addReview, editReview, deleteReview } = require('../controllers/review');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, addReview);
router.put('/:id', auth, editReview);
router.delete('/:id', auth, deleteReview);

module.exports = router;
