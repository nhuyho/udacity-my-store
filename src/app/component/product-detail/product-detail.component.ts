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

  addProductToCart(product: Product, event: any): void {
    let newCartProduct: CartProduct[] = [];
    let message: string = '';
    let isCartExist: boolean = false;

    const selectIndex = event.target[0].options.selectedIndex;
    const selectedOption = event.target[0].options[selectIndex].value;
    const cartProducts: CartProduct[] = this.productService.getCartProduct();
    newCartProduct = cartProducts;
    let productInCart;
    for (let index = 0; index < cartProducts.length; index++) {
      const cartItem = cartProducts[index];
      if (cartItem.id === product.id) {
        productInCart = cartItem;
      }
    }
    if (productInCart) {
      productInCart.option += selectedOption;
    } else {
      newCartProduct.push(Object.assign(product, { option: selectedOption }));
      this.productService.addProduct(newCartProduct);
      message = `New Item '${product.name}' added to cart.`;
    }
    alert(message);
    this.refresh();
  }
}
