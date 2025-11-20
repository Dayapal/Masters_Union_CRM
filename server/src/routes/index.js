import userRoutes from '../routes/users.js';
import express from 'express';

const router = express.Router();

// /api/users
router.use('/users', userRoutes);

export default router;