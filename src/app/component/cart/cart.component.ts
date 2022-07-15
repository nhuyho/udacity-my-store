import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartProduct, Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartProducts!: CartProduct[];
  totalPrice: number | string = '';
  productCount: string[] = ['1', '2', '3', '4', '5'];
  createForm!: FormGroup;
  submitted = false;
  selectedItem = '';
  constructor(
    private productService: ProductService,
    private route: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cartProducts = this.productService.getCartProduct();
    this.calculateTotalAmount();

    this.createForm = this.fb.group({
      firstName: ['', Validators.required],
      address: ['', [Validators.required]],
      creditCard: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.createForm.invalid) {
      return;
    }
    const firstName = this.createForm.get('firstName')?.value;
    this.productService.clearCart();
    this.createForm.reset();
    this.route.navigate([`success/${firstName}/${this.totalPrice}`]);
  }

  refresh(): void {
    window.location.reload();
  }

  selectChange(value: string, product: CartProduct) {
    let index = this.cartProducts.indexOf(product);
    this.cartProducts[index] = product;
    this.cartProducts[0].amount = value;
    localStorage.setItem('products', JSON.stringify(this.cartProducts));
    this.refresh();
    this.calculateTotalAmount();
  }

  calculateTotalAmount() {
    this.totalPrice = this.cartProducts.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
    this.totalPrice = Number(this.totalPrice.toFixed(2));
  }

  deletedItem(id: number) {
    let storageProducts = this.productService.getCartProduct();
    let products = storageProducts.filter(
      (product: CartProduct) => product.id !== id
    );
    window.localStorage.clear();
    localStorage.setItem('products', JSON.stringify(products));
    this.refresh();
    this.calculateTotalAmount();
  }
  get firstName() {
    return this.createForm.get('firstName');
  }
  get address() {
    return this.createForm.get('address');
  }

  get creditCard() {
    return this.createForm.get('creditCard');
  }
}
