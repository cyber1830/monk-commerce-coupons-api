import express from 'express';
import couponRoutes from './routes/couponRoutes';
import cartRoutes from './routes/cartRoutes';
import { errorHandler } from './utils/errorHandler';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/coupons', couponRoutes);
app.use('/api/cart', cartRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;