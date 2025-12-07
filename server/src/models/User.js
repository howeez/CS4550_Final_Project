import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, immutable: true },
  email:    { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  roles: [{ type: String, enum: ['user', 'admin'], default: 'user' }],
  bio: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
