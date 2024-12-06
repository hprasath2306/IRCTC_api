import express from 'express';
import { validateApiKey } from '../middlewares/apiKey';
import { addTrain } from '../controllers/adminController';

export const adminRoutes = express.Router();

adminRoutes.post('/trains', validateApiKey, addTrain);