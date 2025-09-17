import { Router } from 'express';
import CouponController from '../controllers/couponController';

const router = Router();
const couponController = new CouponController();

router.post('/', couponController.createCoupon.bind(couponController));
router.get('/', couponController.getAllCoupons.bind(couponController));
router.get('/:id', couponController.getCouponById.bind(couponController));
router.put('/:id', couponController.updateCoupon.bind(couponController));
router.delete('/:id', couponController.deleteCoupon.bind(couponController));
// router.post('/applicable-coupons', couponController.getApplicableCoupons.bind(couponController));
// router.post('/apply-coupon/:id', couponController.applyCoupon.bind(couponController));

export default router;