export interface Item {
    product_id: number;
    quantity: number;
    price: number;
}

export interface Cart {
    items: Item[];
    total_price: number;
    total_discount: number;
    final_price: number;
}

export class CartModel {
    private cart: Cart;

    constructor() {
        this.cart = {
            items: [],
            total_price: 0,
            total_discount: 0,
            final_price: 0,
        };
    }

    public addItem(item: Item): void {
        this.cart.items.push(item);
        this.calculateTotals();
    }

    public removeItem(productId: number): void {
        this.cart.items = this.cart.items.filter(item => item.product_id !== productId);
        this.calculateTotals();
    }

    public getCart(): Cart {
        return this.cart;
    }

    private calculateTotals(): void {
        this.cart.total_price = this.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        this.cart.final_price = this.cart.total_price - this.cart.total_discount;
    }

    public applyDiscount(discount: number): void {
        this.cart.total_discount += discount;
        this.calculateTotals();
    }
}