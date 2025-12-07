import Book from '../models/Book.js';

export async function getAllBooks(req, res, next) {
  try {
    const q = req.query.q;
    const filter = q ? { title: { $regex: q, $options: 'i' } } : {};
    const books = await Book.find(filter).sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    next(err);
  }
}

export async function getBookById(req, res, next) {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    next(err);
  }
}

export async function createBook(req, res, next) {
  try {
    const { title, author, description, externalId, tags } = req.body;
    if (!title || !author) {
      return res.status(400).json({ message: 'title and author required' });
    }
    const book = await Book.create({
      title,
      author,
      description,
      externalId,
      tags,
      createdBy: req.user?._id || null
    });
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
}

export async function updateBook(req, res, next) {
  try {
    const { title, author, description, externalId, tags } = req.body;
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, description, externalId, tags },
      { new: true, runValidators: true }
    );
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    next(err);
  }
}

export async function deleteBook(req, res, next) {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted' });
  } catch (err) {
    next(err);
  }
}
