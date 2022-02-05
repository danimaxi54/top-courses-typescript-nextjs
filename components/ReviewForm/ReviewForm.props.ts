import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IReviewFormProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  productId: string;
  isOpened: boolean;
}
