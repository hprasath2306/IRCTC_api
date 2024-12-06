import express from 'express';
import { register, login } from '../controllers/authController';

export const authRoutes = express.Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);