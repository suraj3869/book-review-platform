const Book = require('../models/Book');
const Review = require('../models/Review');

exports.addBook = async (req, res) => {
  try {
    const { title, author, description, genre, year } = req.body;
    const book = new Book({ title, author, description, genre, year, addedBy: req.user.id });
    await book.save();
    res.status(201).json(book);
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;
    const total = await Book.countDocuments();
    const books = await Book.find().skip(skip).limit(limit).populate('addedBy', 'name email');
    res.json({ books, total, page, pages: Math.ceil(total / limit) });
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('addedBy', 'name email');
    if (!book) return res.status(404).json({ message: 'Book not found.' });

    const reviews = await Review.find({ bookId: book._id }).populate('userId', 'name');
    const avgRating = reviews.length ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(2) : 0;
    res.json({ book, reviews, avgRating });
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.editBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: 'Book not found.' });
    if (book.addedBy.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized.' });

    Object.assign(book, req.body);
    await book.save();
    res.json(book);
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: 'Book not found.' });
    if (book.addedBy.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized.' });

    await book.deleteOne();
    await Review.deleteMany({ bookId: id });
    res.json({ message: 'Book deleted.' });
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
};
