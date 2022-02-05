import { ISearchProps } from './Search.props';
import styles from './Search.module.css';
import cn from 'classnames';
import { Input } from '../Input/Input';
import { KeyboardEvent, useState } from 'react';
import { Button } from '../Button/Button';

import GlassIcon from './glass.svg';
import { useRouter } from 'next/router';

export const Search = ({ className, ...props }: ISearchProps): JSX.Element => {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  const goToSearch = () => {
    router.push({
      pathname: '/search',
      query: {
        q: search,
      },
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      goToSearch();
    }
  };

  return (
    <form className={cn(className, styles.search)} role={'search'} {...props}>
      <Input
        className={styles.input}
        placeholder='Поиск...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        className={styles.button}
        appearance='primary'
        onClick={goToSearch}
        aria-label='Искать по сайту'
      >
        <GlassIcon />
      </Button>
    </form>
  );
};
