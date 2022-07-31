import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Product } from '../model/product';
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  storage = window.localStorage;
  apiUrl = 'http://localhost:4200/assets/data.json';

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
  constructor(private http: HttpClient) {}

  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  addProduct(product: Product[]): void {
    this.storage.setItem('products', JSON.stringify(product));
  }

  getProductByID(id: number): Observable<Product> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .get<Product>(url)
      .pipe(catchError(this.handleError<Product>(`getProduct id=${id}`)));
  }
}
