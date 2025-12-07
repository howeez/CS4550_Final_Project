import Review from '../models/Review.js';

export async function createReview(req, res, next) {
  try {
    if (!req.user) return res.status(401).json({ message: 'login required' });
    const { externalId, text, rating } = req.body;
    if (!externalId || !text) {
      return res.status(400).json({ message: 'externalId and text required' });
    }
    const review = await Review.create({
      externalId,
      text,
      rating,
      author: req.user._id
    });
    const populated = await review.populate('author', 'username');
    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
}

export async function listReviews(req, res, next) {
  try {
    const { externalId, userId } = req.query;
    const filter = {};
    if (externalId) filter.externalId = externalId;
    if (userId) filter.author = userId;
    const reviews = await Review.find(filter)
      .sort({ createdAt: -1 })
      .populate('author', 'username');
    res.json(reviews);
  } catch (err) {
    next(err);
  }
}
