import { Schema, model, Document } from 'mongoose';

export interface CouponDetails {
    threshold?: number;
    discount: number;
    product_id?: number;
    buy_products?: Array<{ product_id: number; quantity: number }>;
    get_products?: Array<{ product_id: number; quantity: number }>;
    repetition_limit?: number;
}

export interface Coupon extends Document {
    type: 'cart-wise' | 'product-wise' | 'bxgy';
    details: CouponDetails;
    createdAt: Date;
    updatedAt: Date;
}

const couponSchema = new Schema<Coupon>({
    type: {
        type: String,
        enum: ['cart-wise', 'product-wise', 'bxgy'],
        required: true,
    },
    details: {
        type: Object,
        required: true,
    },
}, {
    timestamps: true,
});

export const CouponModel = model<Coupon>('Coupon', couponSchema);