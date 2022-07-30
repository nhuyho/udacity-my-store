import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartProducts: Product[] = [];
  @Input() newProduct!: Product[];
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
    this.calculateTotal();
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

  selectChange(value: string, product: Product) {
    const index = this.cartProducts.indexOf(product);
    this.cartProducts[index] = product;
    this.cartProducts[index].amount = value;
    localStorage.setItem('products', JSON.stringify(this.cartProducts));
    this.refresh();
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalPrice = this.cartProducts.reduce((acc, item) => {
      this.totalPrice = parseFloat((acc + item.price).toFixed(2));
      return this.totalPrice;
    }, 0);
  }

  deletedItem(id: number) {
    const storageProducts = this.productService.getCartProduct();
    const products = storageProducts.filter(
      (product: Product) => product.id !== id
    );
    window.localStorage.clear();
    localStorage.setItem('products', JSON.stringify(products));
    this.refresh();
    this.calculateTotal();
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
