export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'whiskey' | 'beer' | 'Whine';
  alcohol: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}