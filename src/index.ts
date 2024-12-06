import express from 'express';
import dotenv from 'dotenv';
import { authRoutes } from './routes/auth';
import { adminRoutes } from './routes/admin';
import { userRoutes } from './routes/user';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
