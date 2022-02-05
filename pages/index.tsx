import axios from 'axios';

import { GetStaticProps } from 'next';
import { useState } from 'react';
import {
  Button,
  Htag,
  Ptag,
  Tag,
  Rating,
  Input,
  Textarea,
} from '../components';
import { API } from '../helpers/api';
import { MenuItem } from '../interfaces/menu.interface';
import { withLayout } from '../layout/Layout';

function Home({ menu }: HomeProps): JSX.Element {
  const [rating, setRating] = useState<number>(3);

  return (
    <>
      <Htag tag='h1'>Текст</Htag>
      <Button appearance='primary' arrow='right'>
        Кнопка
      </Button>
      <Button appearance='ghost' arrow='right'>
        Кнопка
      </Button>
      <Ptag size='l'>
        Студенты освоят не только hard skills, необходимые для работы
        веб-дизайнером, но и soft skills — навыки, которые позволят эффективно
        взаимодействовать в команде с менеджерами, разработчиками и
        маркетологами. Выпускники факультета могут успешно конкурировать с
        веб-дизайнерами уровня middle.
      </Ptag>
      <Ptag>
        Напишу сразу в двух курсах, так как проходил оба. Java будет многим
        непросвещённым сложновата в изучении, но здесь перевес из-за лидирующего
        положения языка как самого популярного в программировании. Выбор мой пал
        на эту профессию еще и потому, что Java-разработчики получают самую
        большую зарплату. Хотя Python начинает догонять Java по многим моментам,
        но вот в крупном екоме разработке Джава все-таки остается главенствующей
        сейчас. Скажу так – полнота программы и интенсивность присуща обоим
        курсам GeekBrains. Хочу отметить, что с первого дня занятий вы
        приступаете к практике и получаете опыт коммерческой разработки уже в
        свое резюме. Скажу вам как прошедший это – реально помогло в
        трудоустройстве!
      </Ptag>
      <Ptag size='s'>
        Выше указаны программы Adobe InDesign, Adobe Illustrator, Corel Draw и
        ими можно успешно пользоваться дома или в дороге. Современные ноутбуки
        хорошо справляются с нагрузкой, так зачем загонять специалиста в душный
        офис. В этой профессии важным считается вдохновение, поэтому дизайнеры
        ищут его в разных местах.
      </Ptag>
      <Tag size='s'>Тег</Tag>
      <Tag size='m' color='red'>
        Тег
      </Tag>
      <Tag size='s' color='green'>
        Тег
      </Tag>
      <Tag color='primary'>Тег</Tag>
      <Rating rating={rating} setRating={setRating} isEditable />
      <Input placeholder='тест' />
      <Textarea placeholder='тест' />
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory,
  });

  return {
    props: {
      menu,
      firstCategory,
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
