import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config.js';
import authMiddleware from './middleware/authMiddleware.js';
import errorHandler from './middleware/errorHandler.js';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import bookRoutes from './routes/books.js';
import reviewRoutes from './routes/reviews.js';
import bookmarkRoutes from './routes/bookmarks.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(authMiddleware);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/bookmarks', bookmarkRoutes);

app.use(errorHandler);

mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    app.listen(config.PORT, () => {
      console.log('Server listening on port', config.PORT);
    });
  })
  .catch(err => {
    console.error('Failed to connect to DB', err);
    process.exit(1);
  });
