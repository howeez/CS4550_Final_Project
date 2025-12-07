import User from '../models/User.js';
import Review from '../models/Review.js';
import Bookmark from '../models/Bookmark.js';

export async function getMe(req, res, next) {
  try {
    if (!req.user) return res.status(401).json({ message: 'unauthenticated' });
    res.json(req.user);
  } catch (err) {
    next(err);
  }
}

export async function updateMe(req, res, next) {
  try {
    if (!req.user) return res.status(401).json({ message: 'unauthenticated' });
    const updates = {};
    if (typeof req.body.bio === 'string') updates.bio = req.body.bio;
    if (typeof req.body.email === 'string') updates.email = req.body.email;
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-passwordHash');
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function getPublicProfile(req, res, next) {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('username bio createdAt');
    if (!user) return res.status(404).json({ message: 'user not found' });

    const [reviews, bookmarks] = await Promise.all([
      Review.find({ author: id }).sort({ createdAt: -1 }).limit(20),
      Bookmark.find({ user: id }).sort({ createdAt: -1 }).limit(20)
    ]);

    res.json({ user, reviews, bookmarks });
  } catch (err) {
    next(err);
  }
}
