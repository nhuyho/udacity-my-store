export interface Product {
  id: number;
  name: string;
  price: number;
  url: string | Blob;
  description: string;
  amount: string;
}
export interface CartProduct {
  id: number;
  name: string;
  price: number;
  url: string | Blob;
  description: string;
  amount: string;
}
