import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  myStorage = window.localStorage;
  URL = 'http://localhost:4200/assets/data.json';

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.URL);
  }
  addProduct(product: Product[]): void {
    this.myStorage.setItem('products', JSON.stringify(product));
  }
  getDetail(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.URL}/product/${id}`);
  }
  getCartProduct() {
    const getProduct = this.myStorage.getItem('products');
    return getProduct ? JSON.parse(getProduct) : [];
  }
  clearCart(): void {
    this.myStorage.clear();
  }
}
