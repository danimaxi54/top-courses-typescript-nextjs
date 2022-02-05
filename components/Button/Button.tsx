import { IButtonProps } from './Button.props';
import styles from './Button.module.css';
import cn from 'classnames';
import ArrowIcon from './arrow.svg';

import { motion } from 'framer-motion';

export const Button = ({
  appearance,
  arrow = 'none',
  children,
  className,
  ...props
}: IButtonProps): JSX.Element => {
  return (
    <motion.button
      className={cn(styles.button, className, {
        [styles.primary]: appearance == 'primary',
        [styles.ghost]: appearance == 'ghost',
      })}
      whileHover={{ scale: 1.05 }}
      {...props}
    >
      {children}
      {arrow != 'none' && (
        <span
          className={cn(styles.arrow, {
            [styles.down]: arrow == 'down',
          })}
        >
          <ArrowIcon />
        </span>
      )}
    </motion.button>
  );
};
