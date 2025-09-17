import { Router } from 'express';
import { CartController } from '../controllers/cartController';

const router = Router();
const cartController = new CartController();

router.post('/applicable-coupons', cartController.getApplicableCoupons);

router.post('/apply-coupon/:id', cartController.applyCoupon);

export default router;