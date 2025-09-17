import express from 'express';
import { json } from 'body-parser';
import couponRoutes from './routes/couponRoutes';
import cartRoutes from './routes/cartRoutes';
import { errorHandler } from './utils/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use('/coupons', couponRoutes);
app.use('/cart', cartRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});