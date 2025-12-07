import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import config from '../config.js';

export async function register(req, res, next) {
  try {
    const { username, email, password, roles } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'username, email, password required' });
    }
    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      return res.status(400).json({ message: 'username or email already taken' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      passwordHash,
      roles: roles && roles.length ? roles : ['user']
    });
    const token = jwt.sign({ sub: user._id, roles: user.roles }, config.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({
      token,
      user: { id: user._id, username: user.username, email: user.email, roles: user.roles }
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res.status(400).json({ message: 'identifier and password required' });
    }
    const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] });
    if (!user) return res.status(401).json({ message: 'invalid credentials' });
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ message: 'invalid credentials' });

    const token = jwt.sign({ sub: user._id, roles: user.roles }, config.JWT_SECRET, { expiresIn: '7d' });
    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email, roles: user.roles }
    });
  } catch (err) {
    next(err);
  }
}
