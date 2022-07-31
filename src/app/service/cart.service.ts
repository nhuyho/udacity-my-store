import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  storage = window.localStorage;

  constructor() {}
  getCartProduct() {
    const getProduct = this.storage.getItem('products');
    return getProduct ? JSON.parse(getProduct) : [];
  }
  clearCart(): void {
    this.storage.clear();
  }
}
