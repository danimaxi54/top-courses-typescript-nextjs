import styles from './Up.module.css';
import cn from 'classnames';

import { motion, useAnimation } from 'framer-motion';

import UpIcon from './up.svg';
import { useScrollY } from '../../hooks/useScrollY';
import { useEffect } from 'react';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';

export const Up = (): JSX.Element => {
  const controls = useAnimation();
  const y = useScrollY();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    controls.start({ opacity: y / document.body.scrollHeight });
  }, [y, controls]);

  return (
    <motion.div
      className={styles.up}
      animate={controls}
      initial={{ opacity: 0 }}
    >
      <ButtonIcon
        aria-label='Наверх'
        appearance='primary'
        icon='up'
        onClick={scrollToTop}
      />
    </motion.div>
  );
};
