import { Router } from 'express';
import { addBookmark, listBookmarks } from '../controllers/bookmarkController.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = Router();

router.get('/', listBookmarks);
router.post('/', requireAuth, addBookmark);

export default router;
