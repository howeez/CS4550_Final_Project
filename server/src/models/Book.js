import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title:  { type: String, required: true },
  author: { type: String, required: true },
  description: String,
  externalId: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags: [String]
}, { timestamps: true });

export default mongoose.model('Book', bookSchema);
