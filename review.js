const Review = require('../models/Review');

exports.addReview = async (req, res) => {
  try {
    const { bookId, rating, reviewText } = req.body;
    const review = new Review({ bookId, userId: req.user.id, rating, reviewText });
    await review.save();
    res.status(201).json(review);
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.editReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found.' });
    if (review.userId.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized.' });

    Object.assign(review, req.body);
    await review.save();
    res.json(review);
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found.' });
    if (review.userId.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized.' });

    await review.deleteOne();
    res.json({ message: 'Review deleted.' });
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
};
