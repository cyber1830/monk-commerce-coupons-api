export interface Coupon {
    id: string;
    type: 'cart-wise' | 'product-wise' | 'bxgy';
    details: CouponDetails;
}

export interface CouponDetails {
    threshold?: number; // For cart-wise coupons
    discount?: number; // Percentage or fixed amount
    product_id?: string; // For product-wise coupons
    buy_products?: BuyProduct[]; // For BxGy coupons
    get_products?: GetProduct[]; // For BxGy coupons
    repetition_limit?: number; // For BxGy coupons
}

export interface BuyProduct {
    product_id: string;
    quantity: number;
}

export interface GetProduct {
    product_id: string;
    quantity: number;
}

export interface CartItem {
    product_id: string;
    quantity: number;
    price: number;
}

export interface Cart {
    items: CartItem[];
    total_price: number;
    total_discount: number;
    final_price: number;
}

export interface ApplicableCoupon {
    coupon_id: string;
    type: 'cart-wise' | 'product-wise' | 'bxgy';
    discount: number;
}