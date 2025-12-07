import jwt from 'jsonwebtoken';
import config from '../config.js';
import User from '../models/User.js';

export default async function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return next();
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, config.JWT_SECRET);
    const user = await User.findById(payload.sub).select('-passwordHash');
    if (user) req.user = user;
  } catch (err) {}
  next();
}
