import express from 'express';
import { googleAuth, getMe } from '../controllers/auth.controller.js';
import protect from '../middlewares/auth.middleware.js';

const router = express.Router();

// POST /api/auth/google — Google sign-in / register
router.post('/google', googleAuth);

// GET /api/auth/me — get current user (protected)
router.get('/me', protect, getMe);

export default router;
