export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'whiskey' | 'beer' |'spirits'| 'gin' | 'vodka' | 'Wine' | 'tequila';
  alcohol: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  photoUrl?: string;
}