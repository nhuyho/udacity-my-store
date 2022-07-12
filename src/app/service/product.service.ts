import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartProduct, Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  myStorage = window.localStorage;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:4200/assets/data.json');
  }
  addToCart(product: CartProduct[]): void {
    this.myStorage.setItem('cart', JSON.stringify(product));
  }
  getDetail(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      `http://localhost:4200/assets/data.json/product/${id}`
    );
  }
  getCartProduct() {
    const getProduct = this.myStorage.getItem('cart');
    return getProduct ? JSON.parse(getProduct) : [];
  }
  clearCart(): void {
    this.myStorage.clear();
  }
}
