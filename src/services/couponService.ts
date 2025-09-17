import { Coupon } from '../models/couponModel';
import { Cart } from '../models/cartModel';

class CouponService {
    private coupons: Coupon[] = [];

    createCoupon(coupon: Coupon): Coupon {
        this.coupons.push(coupon);
        return coupon;
    }

    getAllCoupons(): Coupon[] {
        return this.coupons;
    }

    getCouponById(id: string): Coupon | undefined {
        return this.coupons.find(coupon => coupon.id === id);
    }

    updateCoupon(id: string, updatedCoupon: Coupon): Coupon | undefined {
        const index = this.coupons.findIndex(coupon => coupon.id === id);
        if (index !== -1) {
            Object.assign(this.coupons[index], updatedCoupon);
            return this.coupons[index];
        }
        return undefined;
    }

    deleteCoupon(id: string): boolean {
        const index = this.coupons.findIndex(coupon => coupon.id === id);
        if (index !== -1) {
            this.coupons.splice(index, 1);
            return true;
        }
        return false;
    }

    validateCoupon(couponId: string, cart: Cart): boolean {
        const coupon = this.getCouponById(couponId);
        if (!coupon) return false;
        return true;
    }
}

export default new CouponService();