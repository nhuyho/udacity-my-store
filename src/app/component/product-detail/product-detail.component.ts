import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { takeUntil } from 'rxjs';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  private ngUnsubscribe = new Subject<void>();
  product!: Product;
  products!: Product[];
  quantity: number = 1;
  id!: number;
  productCount: string[] = ['1', '2', '3', '4', '5'];
  selectedItem = '1';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
    });
    this.productService
      .getProduct()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res) => {
          this.products = res;
          this.product = this.getProductDetails(this.id);
        },
        error: (err) => console.log(err),
      });
  }

  getProductDetails(id: any) {
    return this.products.filter((item) => item.id === id)[0];
  }

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
    this.router.navigate(['/cart']);
  }

  refresh(): void {
    window.location.reload();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
