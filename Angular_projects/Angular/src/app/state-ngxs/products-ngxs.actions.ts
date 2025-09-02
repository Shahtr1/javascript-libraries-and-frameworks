import { Product } from '../core/in-memory-data.service';

export class LoadProducts {
  static readonly type = '[Products] Load';
}

export class SelectProduct {
  static readonly type = '[Products] Select';
  constructor(public id: number | null) {}
}

export class SaveProduct {
  static readonly type = '[Products] Save';
  constructor(public product: Product) {}
}
