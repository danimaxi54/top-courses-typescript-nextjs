import { IReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import { Button, Input, Rating, Textarea } from '..';
import { useForm, Controller } from 'react-hook-form';

import CloseIcon from './close.svg';
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '../../helpers/api';
import { useState } from 'react';

export const ReviewForm = ({
  productId,
  isOpened,
  className,
  ...props
}: IReviewFormProps): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<IReviewForm>();
  const [isSucces, setIsSucces] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(
        API.review.createDemo,
        {
          ...formData,
          productId,
        }
      );

      if (data.message) {
        setIsSucces(true);
        reset();
      } else {
        setIsSucces(false);
        setError('Что-то пошло не так');
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input
          placeholder='Имя'
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={errors.name ? true : false}
          error={errors.name}
          {...register('name', {
            required: { value: true, message: 'Заполните имя' },
          })}
        />
        <Input
          className={styles.title}
          placeholder='Заголовок отзыва'
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={errors.title ? true : false}
          error={errors.title}
          {...register('title', {
            required: { value: true, message: 'Заполните заголовок' },
          })}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name='rating'
            rules={{ required: { value: true, message: 'Укажите рейтинг' } }}
            render={({ field }) => (
              <Rating
                tabIndex={isOpened ? 0 : -1}
                rating={field.value}
                isEditable
                setRating={field.onChange}
                ref={field.ref}
                error={errors.rating}
              />
            )}
          />
        </div>
        <Textarea
          {...register('description', {
            required: { value: true, message: 'Заполните описание' },
          })}
          tabIndex={isOpened ? 0 : -1}
          aria-label='Текст отзыва'
          aria-invalid={errors.description ? true : false}
          className={styles.description}
          placeholder='Текст отзыва'
          error={errors.description}
        />
        <div className={styles.submit}>
          <Button
            appearance='primary'
            tabIndex={isOpened ? 0 : -1}
            onClick={() => clearErrors()}
          >
            Отправить
          </Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>
      {isSucces && (
        <div className={cn(styles.success, styles.panel)} role='alert'>
          <div className={styles.successTitle}>Ваш отзыв отправлен</div>
          <div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
          <button
            className={styles.close}
            onClick={() => setIsSucces(false)}
            aria-label='Закрыть оповещение'
          >
            <CloseIcon />
          </button>
        </div>
      )}
      {error && (
        <div className={cn(styles.error, styles.panel)}>
          Что-то пошло не так, попробуйте обновить страницу
          <button
            className={styles.close}
            onClick={() => setError(undefined)}
            aria-label='Закрыть оповещение'
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </form>
  );
};
