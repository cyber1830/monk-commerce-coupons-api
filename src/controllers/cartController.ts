import { Request, Response } from 'express';
import { Cart } from '../models/cartModel';
import { DiscountService } from '../services/discountService';
import CouponService from '../services/couponService';

export class CartController {
    public async getApplicableCoupons(req: Request, res: Response): Promise<void> {
        const cart: Cart = req.body.cart;

        try {
            const allCoupons = CouponService.getAllCoupons();
            const applicableCoupons = allCoupons;

            const { totalDiscount, freeItems } = DiscountService.calculateTotalDiscount(cart, applicableCoupons);

            res.status(200).json({
                applicable_coupons: applicableCoupons,
                total_discount: totalDiscount,
                free_items: freeItems
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async applyCoupon(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const cart: Cart = req.body.cart;

        try {
            const coupon = CouponService.getCouponById(id);
            if (!coupon) {
                res.status(404).json({ error: 'Coupon not found' });
                return;
            }

            let discount = 0;
            switch (coupon.type) {
                case 'cart-wise':
                    discount = DiscountService.calculateCartWiseDiscount(cart, coupon);
                    break;
                case 'product-wise':
                    discount = DiscountService.calculateProductWiseDiscount(cart, coupon);
                    break;
                case 'bxgy':
                    const bxgyResult = DiscountService.calculateBxGyDiscount(cart, coupon);
                    discount = bxgyResult.discount;
                    break;
            }

            const updatedCart = {
                ...cart,
                total_discount: discount,
                final_price: cart.total_price - discount,
                items: [...cart.items]
            };

            res.status(200).json({
                updated_cart: updatedCart
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}