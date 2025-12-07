import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema({
  externalId: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

bookmarkSchema.index({ externalId: 1, user: 1 }, { unique: true });

export default mongoose.model('Bookmark', bookmarkSchema);
