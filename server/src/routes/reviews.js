import { Router } from 'express';
import { createReview, listReviews } from '../controllers/reviewController.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = Router();

router.get('/', listReviews);
router.post('/', requireAuth, createReview);

export default router;
