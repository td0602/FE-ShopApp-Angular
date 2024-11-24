import { Injectable } from "@angular/core";
import { ProductService } from "./product.service";
import { Product } from "../models/product";

@Injectable({
    providedIn: 'root'
})

export class CartService {
    localStorage?: Storage
    // dung Map de lu tru gio hang: id-so luong
    private cart: Map<number, number> = new Map();

    constructor(private productService: ProductService) {
        const storedCart = localStorage.getItem('cart');
        if(storedCart) {
            this.cart = new Map(JSON.parse(storedCart));
            // vd object Map: { "2": 5}
        }
    }
    
    addToCart(productId: number, quantity: number = 1): void {
        debugger
        if(this.cart.has(productId)) {
            // Neu sp da co trong gio hang chi tang SL sp trong gio hang len
            this.cart.set(productId, this.cart.get(productId)! + quantity);
        } else {
            // neu san pham chua co thi them san pham vao gio voi so luong la quantity
            this.cart.set(productId, quantity);
        }
        // sau khi thay doi gio hang luu vao localStorage
        this.saveCartTotalStorage();
    }

    getCart(): Map<number, number> {
        return this.cart;
    }

    setCart(cart: Map<number, number>) {
        this.cart = cart ?? new Map<number, number>()
        this.saveCartToLocalStorage()
    }

    private saveCartTotalStorage(): void {
        debugger 
        localStorage.setItem('cart', JSON.stringify(Array.from(this.cart.entries()))); 
    }

    clearCart(): void {
        this.cart.clear(); // xoa toan bo du lieu trong gio hang
        this.saveCartTotalStorage(); //sau khi xoa luu lai
    }

    private getCartKey(): string {
        const userResponseJSON = this.localStorage?.getItem('user')
        const userResponse = JSON.parse(userResponseJSON!)
        // debugger
        return `cart:${userResponse?.id ?? ''}`
    
      }
    
      // Lưu trữ giỏ hàng vào localStorage
      private saveCartToLocalStorage(): void {
        // debugger
        this.localStorage?.setItem(this.getCartKey(), JSON.stringify(Array.from(this.cart.entries())))
      }
}

