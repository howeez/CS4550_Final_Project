import Bookmark from '../models/Bookmark.js';

export async function addBookmark(req, res, next) {
  try {
    if (!req.user) return res.status(401).json({ message: 'login required' });
    const { externalId } = req.body;
    if (!externalId) return res.status(400).json({ message: 'externalId required' });

    const bm = await Bookmark.create({
      externalId,
      user: req.user._id
    });
    res.status(201).json(bm);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'already bookmarked' });
    }
    next(err);
  }
}

export async function listBookmarks(req, res, next) {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: 'userId query param required' });
    }
    const bms = await Bookmark.find({ user: userId }).sort({ createdAt: -1 });
    res.json(bms);
  } catch (err) {
    next(err);
  }
}
