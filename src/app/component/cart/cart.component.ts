import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartProducts: Product[] = [];
  @Output() userInfo = new EventEmitter();
  totalPrice: number | string = '';
  productCount: string[] = ['1', '2', '3', '4', '5'];
  selectedItem = '';
  constructor(private cartService: CartService, private route: Router) {}

  ngOnInit(): void {
    this.cartProducts = this.cartService.getCartProduct();
    this.calculateTotal();
  }

  onSubmit(value: any) {
    this.cartService.clearCart();
    this.route.navigate([`success/${value.firstName}/${this.totalPrice}`]);
  }

  refresh(): void {
    window.location.reload();
  }

  selectChange(value: string, product: Product) {
    const index = this.cartProducts.indexOf(product);
    this.cartProducts[index] = product;
    this.cartProducts[index].amount = value;
    localStorage.setItem('products', JSON.stringify(this.cartProducts));
    this.calculateTotal();
    this.refresh();
  }

  calculateTotal() {
    this.totalPrice = this.cartProducts.reduce((acc, item) => {
      this.totalPrice = parseFloat(
        (acc + item.price * Number(item.amount)).toFixed(2)
      );
      return this.totalPrice;
    }, 0);
  }

  deletedItem(id: number) {
    const storageProducts = this.cartService.getCartProduct();
    const products = storageProducts.filter(
      (product: Product) => product.id !== id
    );
    window.localStorage.clear();
    localStorage.setItem('products', JSON.stringify(products));
    this.refresh();
    this.calculateTotal();
  }
}
