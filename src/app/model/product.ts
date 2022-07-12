export interface Product {
  id: number;
  name: string;
  price: number;
  url: string | Blob;
  description: string;
}
export interface CartProduct {
  id: number;
  name: string;
  price: number;
  url: string | Blob;
  description: string;
  option: string;
}
export const productCount: string[] = ['1', '2', '3', '4', '5'];
