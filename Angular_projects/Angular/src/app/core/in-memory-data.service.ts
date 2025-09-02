import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';

export interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  topic: string;
  message: string;
}

export class InMemoryDataService implements InMemoryDbService {
  constructor() {}

  createDb() {
    const products: Product[] = [
      {
        id: 1,
        name: 'Widget A',
        price: 1299,
        inStock: true,
      },
      {
        id: 2,
        name: 'Widget B',
        price: 2599,
        inStock: false,
      },
      {
        id: 3,
        name: 'Widget C',
        price: 999,
        inStock: true,
      },
    ];
    const contacts: ContactMessage[] = [];

    return { products, contacts };
  }
}
