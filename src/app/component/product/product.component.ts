import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() productItem!: Product;
  selectedItem = '1';
  productCount: string[] = ['1', '2', '3', '4', '5'];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {}

  selectedChange(value: any) {
    this.selectedItem = value;
  }

  addProductToCart(product: Product): void {
    const cartProducts: Product[] = this.cartService.getCartProduct();
    let productInCart = cartProducts.find((ele) => ele.id === product.id);
    if (productInCart) {
      productInCart.amount = this.selectedItem;
      productInCart ? this.productService.addProduct(cartProducts) : null;
    } else {
      cartProducts.push(Object.assign(product, { amount: this.selectedItem }));
      this.productService.addProduct(cartProducts);
      const message = `${product.name} has been added to your cart.`;
      alert(message);
    }
    this.refresh();
  }

  refresh(): void {
    window.location.reload();
  }
}
