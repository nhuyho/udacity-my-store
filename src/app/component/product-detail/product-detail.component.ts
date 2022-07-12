import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartProduct, Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  products!: Product[];
  quantity: number = 1;
  id!: number;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
    });
    this.productService.getProduct().subscribe((res) => {
      this.products = res;
      this.product = this.getProductById(this.id);
    });
  }

  getProductById(id: number) {
    return this.products.filter((product) => product.id === id)[0];
  }

  refresh(): void {
    window.location.reload();
  }

  onSubmit(cartProduct: Product, event: any) {
    let newCartProduct: CartProduct[] = [];
    let message: string = '';
    let isCartOptionExist: boolean = false;

    const selectIndex = event.target[0].options.selectedIndex;
    const selectedOption = event.target[0].options[selectIndex].value;
    const cartProducts: CartProduct[] = this.productService.getCartProduct();
    newCartProduct = cartProducts;
    const index = cartProducts.findIndex((cart) => cart.id === cartProduct.id);

    if (cartProducts.length === 0) {
      newCartProduct.push(
        Object.assign(cartProduct, { option: selectedOption })
      );
      message = `New Item '${cartProduct.name}' added to cart.`;
    } else {
      const option: string = newCartProduct[index].option;
      isCartOptionExist = selectedOption === option;
      newCartProduct[index].id = cartProduct.id;
      newCartProduct[index].option = selectedOption;
      message = `${option} Item(s) of '${cartProduct.name}' already exist in cart. Will be updated to ${selectedOption}`;
    }
    !isCartOptionExist ? this.productService.addToCart(newCartProduct) : null;
    alert(message);
    this.refresh();
    return false;
  }
}
