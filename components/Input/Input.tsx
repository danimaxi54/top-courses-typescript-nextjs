import { IInputProps } from './Input.props';
import styles from './Input.module.css';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

export const Input = forwardRef(
  (
    { className, error, ...props }: IInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    return (
      <div className={styles.inputWrapper}>
        <input
          className={cn(styles.input, className, {
            [styles.error]: error,
          })}
          ref={ref}
          {...props}
        />
        {error && (
          <span className={styles.errorMessage} role='alert'>
            {error.message}
          </span>
        )}
      </div>
    );
  }
);
