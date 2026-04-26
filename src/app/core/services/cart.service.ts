import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<Cart>(this.getStoredCart());
  public cart$ = this.cartSubject.asObservable();
  public cartItemsCount$ = new BehaviorSubject<number>(0);

  constructor() {
    this.updateCartCount();
  }

  private getStoredCart(): Cart {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : { items: [], subtotal: 0, total: 0 };
  }

  private saveCart(cart: Cart): void {
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartSubject.next(cart);
    this.updateCartCount();
  }

  private updateCartCount(): void {
    const cart = this.getStoredCart();
    const count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    this.cartItemsCount$.next(count);
  }

  getCart(): Cart {
    return this.cartSubject.value;
  }

  addToCart(product: any, quantity: number = 1): void {
    const cart = this.getStoredCart();
    const existingItem = cart.items.find(item => item.productId === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.images?.[0]?.image_url || ''
      });
    }

    cart.subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cart.total = cart.subtotal; // Add shipping/tax later
    this.saveCart(cart);
  }

  removeFromCart(productId: number): void {
    const cart = this.getStoredCart();
    cart.items = cart.items.filter(item => item.productId !== productId);
    cart.subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cart.total = cart.subtotal; // Add shipping/tax later
    this.saveCart(cart);
  }

  clearCart(): void {
    const emptyCart: Cart = { items: [], subtotal: 0, total: 0 };
    this.saveCart(emptyCart);
  }
} 