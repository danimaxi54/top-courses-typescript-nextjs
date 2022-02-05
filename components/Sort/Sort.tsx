import { ISortProps, SortEnum } from './Sort.props';
import styles from './Sort.module.css';
import cn from 'classnames';

import SortIcon from './sort.svg';

export const Sort = ({
  sort,
  setSort,
  className,
  ...props
}: ISortProps): JSX.Element => {
  return (
    <div className={cn(styles.sort, className)} {...props}>
      <div className={styles.sortName} id='sort'>
        Сортировка
      </div>
      <button
        className={cn({
          [styles.active]: sort == SortEnum.Rating,
        })}
        id='rating'
        aria-labelledby='sort rating'
        aria-selected={sort == SortEnum.Rating}
        onClick={() => setSort(SortEnum.Rating)}
      >
        <SortIcon className={styles.sortIcon} />
        По рейтингу
      </button>
      <button
        className={cn({
          [styles.active]: sort == SortEnum.Price,
        })}
        id='price'
        aria-labelledby='sort price'
        aria-selected={sort == SortEnum.Price}
        onClick={() => setSort(SortEnum.Price)}
      >
        <SortIcon className={styles.sortIcon} />
        По&nbsp;цене
      </button>
    </div>
  );
};
