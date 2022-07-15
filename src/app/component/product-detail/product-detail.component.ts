import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  productCount: string[] = ['1', '2', '3', '4', '5'];
  newProductList!: CartProduct[];
  selectedItem = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
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

  addProductToCart(product: Product): void {
    const cartProducts: CartProduct[] = this.productService.getCartProduct();
    let newProduct;
    let message = '';
    let productInCart;

    newProduct = cartProducts;
    cartProducts.forEach((cart, index) => {
      const cartItem = cartProducts[index];
      if (cartItem.id === product.id) {
        productInCart = cartItem;
      }
    });
    if (productInCart) {
      const existProduct = cartProducts.filter(
        (item) => item.id === product.id
      );
      newProduct = existProduct;
      newProduct[0].amount = this.selectedItem;
      existProduct ? this.productService.addProduct(newProduct) : null;
    } else {
      newProduct.push(Object.assign(product, { amount: this.selectedItem }));
      this.productService.addProduct(newProduct);
      message = `New Item '${product.name}' added to cart.`;
      alert(message);
    }
    this.router.navigate(['/cart']);
    this.refresh();
  }
}
