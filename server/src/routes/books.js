import { Router } from 'express';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} from '../controllers/bookController.js';
import { requireAuth } from '../middleware/requireAuth.js';
import { requireAdmin } from '../middleware/requireAdmin.js';

const router = Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', requireAuth, requireAdmin, createBook);
router.put('/:id', requireAuth, requireAdmin, updateBook);
router.delete('/:id', requireAuth, requireAdmin, deleteBook);

export default router;
