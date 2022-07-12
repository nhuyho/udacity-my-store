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
    this.refresh();
    this.route.navigate([`success/${firstName}/${this.totalPrice}`]);
  }

  refresh(): void {
    window.location.reload();
  }

  selectChange(id: number, event: any) {
    const index = event.target.options.selectedIndex;
    const val = event.target.options[index].value;
    const item = this.cartProducts.findIndex((cart) => cart.id === id);
    item != -1 && this.cartProducts.length > 0
      ? (this.cartProducts[item].option = val)
      : null;

    this.cartProducts.length > 0
      ? this.productService.addProduct(this.cartProducts)
      : null;
    this.refresh();
    this.calculateTotalAmount();
  }

  calculateTotalAmount() {
    this.totalPrice = this.cartProducts.reduce((item: number, val: any) => {
      return item + val.price * Number(val.option);
    }, 0);
    this.totalPrice = Number(this.totalPrice.toFixed(2));
  }

  deletedItem(id: number) {
    const cartIdx = this.cartProducts
      ? this.cartProducts.findIndex((cart) => cart.id === id)
      : -1;
    if (cartIdx != -1 && this.cartProducts.length > 0) {
      this.cartProducts.splice(cartIdx, 1);
      this.productService.addProduct(this.cartProducts);
      this.refresh();
      this.calculateTotalAmount();
    }
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
