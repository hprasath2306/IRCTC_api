import { Request, Response, NextFunction } from 'express';
import { API_KEY } from '../config';

export const validateApiKey = (req: Request, res: Response, next: NextFunction) => {
  const key = req.headers['x-api-key'];
  if (key === API_KEY) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
};