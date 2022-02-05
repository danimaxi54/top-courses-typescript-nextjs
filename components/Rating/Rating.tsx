import { IRatingProps } from './Rating.props';
import styles from './Rating.module.css';
import cn from 'classnames';
import RatingIcon from './rating.svg';

import {
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

export const Rating = forwardRef(
  (
    {
      rating,
      setRating,
      isEditable = false,
      error,
      tabIndex,
      ...props
    }: IRatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
      new Array(5).fill(<></>)
    );
    const ratingArrayRef = useRef<HTMLSpanElement[] | null>([]);

    const constructRating = (currentRating: number) => {
      const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
        return (
          <span
            className={cn(styles.star, {
              [styles.filled]: i < currentRating,
              [styles.editable]: isEditable,
            })}
            tabIndex={computeFocus(rating, i)}
            ref={(r) => ratingArrayRef.current?.push(r)}
            role={isEditable ? 'slider' : ''}
            aria-valuenow={rating}
            aria-valuemin={1}
            aria-valuemax={5}
            aria-label={isEditable ? 'Укажите рейтинг' : 'рейтинг' + rating}
            aria-invalid={error ? true : false}
            onMouseEnter={() => changeDisplay(i + 1)}
            onMouseLeave={() => changeDisplay(rating)}
            onClick={() => onCLick(i + 1)}
            onKeyDown={handleKey}
          >
            <RatingIcon />
          </span>
        );
      });

      setRatingArray(updatedArray);
    };

    const changeDisplay = (i: number) => {
      if (!isEditable) {
        return;
      }

      constructRating(i);
    };

    const onCLick = (i: number) => {
      if (!isEditable || !setRating) {
        return;
      }

      setRating(i);
    };

    const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
      if (!isEditable || !setRating) {
        return;
      }

      if (e.code == 'ArrowRight' || e.code == 'ArrowUp') {
        e.preventDefault();

        if (!rating) {
          setRating(1);
        } else {
          setRating(rating < 5 ? rating + 1 : 5);
        }

        ratingArrayRef.current[rating]?.focus();
      }

      if (e.code == 'ArrowLeft' || e.code == 'ArrowDown') {
        e.preventDefault();

        setRating(rating > 1 ? rating - 1 : 1);

        ratingArrayRef.current[rating - 2]?.focus();
      }
    };

    const computeFocus = (r: number, i: number): number => {
      if (!isEditable) {
        return -1;
      }

      if (!rating && i == 0) {
        return tabIndex ?? 0;
      }

      if (r == i + 1) {
        return tabIndex ?? 0;
      }

      return -1;
    };

    useEffect(() => {
      constructRating(rating);
    }, [rating, tabIndex]);

    return (
      <div
        className={cn(styles.ratingWrapper, {
          [styles.error]: error,
        })}
        {...props}
        ref={ref}
      >
        {ratingArray.map((r, i) => (
          <span key={i}>{r}</span>
        ))}
        {error && (
          <span className={styles.errorMessage} role='alert'>
            {error.message}
          </span>
        )}
      </div>
    );
  }
);
