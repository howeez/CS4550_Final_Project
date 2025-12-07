import { Router } from 'express';
import { getMe, updateMe, getPublicProfile } from '../controllers/userController.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = Router();

router.get('/me', requireAuth, getMe);
router.put('/me', requireAuth, updateMe);
router.get('/:id', getPublicProfile);

export default router;
