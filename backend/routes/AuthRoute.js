import express from 'express';
import { login, refreshToken, logout } from '../controllers/AuthController.js';

const router = express.Router();

router.post('/login', login);
router.get('/token', refreshToken);
router.delete('/logout', logout);

export default router;