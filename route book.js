const express = require('express');
const {
  addBook, getBooks, getBook, editBook, deleteBook
} = require('../controllers/book');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, addBook);
router.get('/', getBooks);
router.get('/:id', getBook);
router.put('/:id', auth, editBook);
router.delete('/:id', auth, deleteBook);

module.exports = router;
