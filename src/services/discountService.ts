import { Coupon } from '../models/couponModel';
import { Cart } from '../models/cartModel';

export interface CartItem {
    product_id: number;
    quantity: number;
    price: number;
}

export class DiscountService {
    static calculateCartWiseDiscount(cart: Cart, coupon: Coupon): number {
        if (
            typeof coupon.details.threshold === 'number' &&
            cart.total_price > coupon.details.threshold
        ) {
            return (cart.total_price * coupon.details.discount) / 100;
        }
        return 0;
    }

    static calculateProductWiseDiscount(cart: Cart, coupon: Coupon): number {
        const item = cart.items.find((item: CartItem) => item.product_id === coupon.details.product_id);
        if (item) {
            return (item.price * item.quantity * coupon.details.discount) / 100;
        }
        return 0;
    }

    static calculateBxGyDiscount(cart: Cart, coupon: Coupon): { discount: number; freeItems: CartItem[] } {
        const buyProducts = coupon.details.buy_products;
        const getProducts = coupon.details.get_products;
        let totalBuyQuantity = 0;
        let freeItems: CartItem[] = [];

        if (Array.isArray(buyProducts)) {
            buyProducts.forEach((buyProduct: { product_id: number; quantity: number }) => {
                const item = cart.items.find((item: CartItem) => item.product_id === buyProduct.product_id);
                if (item) {
                    totalBuyQuantity += item.quantity;
                }
            });
        }

        const buyProductsQuantitySum = Array.isArray(buyProducts)
            ? buyProducts.reduce((acc, curr) => acc + curr.quantity, 0)
            : 0;
        const applicableRepetitions = buyProductsQuantitySum > 0
            ? Math.floor(totalBuyQuantity / buyProductsQuantitySum)
            : 0;
        const totalFreeItems = applicableRepetitions * (Array.isArray(getProducts)
            ? getProducts.reduce((acc, curr) => acc + curr.quantity, 0)
            : 0);

        if (Array.isArray(getProducts)) {
            getProducts.forEach((getProduct: { product_id: number; quantity: number }) => {
                for (let i = 0; i < applicableRepetitions * getProduct.quantity; i++) {
                    freeItems.push({ product_id: getProduct.product_id, quantity: 1, price: 0 });
                }
            });
        }

        // Calculate total price of free items if they exist in cart
        let totalFreeItemsPrice = 0;
        freeItems.forEach(freeItem => {
            const cartItem = cart.items.find(item => item.product_id === freeItem.product_id);
            if (cartItem) {
                totalFreeItemsPrice += cartItem.price;
            }
        });

        return { discount: totalFreeItemsPrice, freeItems };
    }

    static calculateTotalDiscount(cart: Cart, applicableCoupons: Coupon[]): { totalDiscount: number; freeItems: CartItem[] } {
        let totalDiscount = 0;
        let freeItems: CartItem[] = [];

        applicableCoupons.forEach((coupon: Coupon) => {
            switch (coupon.type) {
                case 'cart-wise':
                    totalDiscount += this.calculateCartWiseDiscount(cart, coupon);
                    break;
                case 'product-wise':
                    totalDiscount += this.calculateProductWiseDiscount(cart, coupon);
                    break;
                case 'bxgy':
                    const { discount, freeItems: bxgyFreeItems } = this.calculateBxGyDiscount(cart, coupon);
                    totalDiscount += discount;
                    freeItems = [...freeItems, ...bxgyFreeItems];
                    break;
            }
        });

        return { totalDiscount, freeItems };
    }
}