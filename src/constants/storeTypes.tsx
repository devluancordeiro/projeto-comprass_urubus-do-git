export interface product {
  category: {id: number; name: string};
  title: string;
  description: string;
  price: number;
  images: string[];
  id: number;
}

export interface category {
  name: string;
}

export type methods = 'Credit or debit card' | 'Pix' | 'Bank slip' | 'None';

export interface address {
  cep: string;
  address: string;
  city: string;
  state: string;
  fullName: string;
}
