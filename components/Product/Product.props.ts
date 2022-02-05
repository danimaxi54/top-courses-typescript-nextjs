import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { ProductModel } from '../../interfaces/product.interface';

export interface IProductProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: ProductModel;
}
