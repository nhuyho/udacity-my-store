import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartProduct, Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  pageTitle: string = 'My Store';
  cartProductList!: CartProduct[];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.cartProductList = this.productService.getCartProduct();
    this.calculate(this.cartProductList);
  }

  calculate(cart: CartProduct[]) {
    let sum = 0;
    cart.forEach((item) => {
      sum += Number(item.amount);
    });
    const ele = document.getElementById('cartAmount') as HTMLElement;
    ele.innerHTML = sum.toString();
  }
}
