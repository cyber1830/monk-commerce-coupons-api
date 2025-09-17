import { Request, Response, NextFunction } from 'express';
import CouponService from '../services/couponService';

class CouponController {
    private couponService = CouponService;

    constructor() {}

    public createCoupon = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const coupon = await this.couponService.createCoupon(req.body);
            res.status(201).json(coupon);
        } catch (error) {
            next({ statusCode: 400, message: 'Failed to create coupon' });
        }
    };

    public getAllCoupons = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const coupons = await this.couponService.getAllCoupons();
            res.status(200).json(coupons);
        } catch (error) {
            next({ statusCode: 500, message: 'Failed to fetch coupons' });
        }
    };

    public getCouponById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const coupon = await this.couponService.getCouponById(req.params.id);
            if (!coupon) {
                return next({ statusCode: 404, message: 'Coupon not found' });
            }
            res.status(200).json(coupon);
        } catch (error) {
            next({ statusCode: 500, message: 'Failed to fetch coupon' });
        }
    };

    public updateCoupon = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const updatedCoupon = await this.couponService.updateCoupon(req.params.id, req.body);
            if (!updatedCoupon) {
                return next({ statusCode: 404, message: 'Coupon not found' });
            }
            res.status(200).json(updatedCoupon);
        } catch (error) {
            next({ statusCode: 400, message: 'Failed to update coupon' });
        }
    };

    public deleteCoupon = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const deletedCoupon = await this.couponService.deleteCoupon(req.params.id);
            if (!deletedCoupon) {
                return next({ statusCode: 404, message: 'Coupon not found' });
            }
            res.status(204).send();
        } catch (error) {
            next({ statusCode: 500, message: 'Failed to delete coupon' });
        }
    };
}

export default CouponController;
