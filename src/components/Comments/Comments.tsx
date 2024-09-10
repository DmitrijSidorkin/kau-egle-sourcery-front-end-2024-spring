import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { User, CommentsProps } from './types';
import DisplayStarsRating from '../DisplayStarsRating/DisplayStarsRating';
import modifyImageUrl from '@/utils/modifyImageUrl';
import styles from './Comments.module.scss';

function Comments({ ratings, mealId, displayStars }: CommentsProps) {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [errors, setErrors] = useState<string | null>(null);
  const mealRatings = ratings.filter((rating) => rating.mealId === mealId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3002/users');
        if (!response.ok) {
          throw new Error('There was an error getting data from users, please try again later');
        }
        const data = await response.json();
        setAllUsers(data);
      } catch (error) {
        if (error instanceof Error) {
          setErrors(error.message);
        }
      }
    };

    fetchData();
  }, []);
  return (
    <div className={styles.comments}>
      <h3 className={styles.comments__title}>{`Comments (${mealRatings.length})`}</h3>
      {(errors && <p className={styles.comments__error}>{errors}</p>) || (
        <div className={styles['comments__comments-container']}>
          {mealRatings.map((comment) => {
            const commentUser = allUsers.find((user) => Number(user.id) === comment.rating.userId);
            let imgUrl = commentUser?.img;
            if (imgUrl) {
              imgUrl = modifyImageUrl(imgUrl, 22);
            }
            return (
              <div className={styles.comments__comment} key={uuid()}>
                <div className={styles['comments__user-details']}>
                  <figure>
                    <img
                      className={styles['comments__pfp-icon']}
                      src={imgUrl || '/src/assets/icons/question_mark.png'}
                      alt="user"
                    />
                  </figure>
                  <div className={styles['comments__user-header']}>
                    <p className={styles['comments__user-name']}>
                      {commentUser ? `${commentUser.name} ${commentUser.surname}` : 'Anonymous'}
                    </p>
                    {displayStars && (
                      <div className={styles['comments__comment-rating']}>
                        <DisplayStarsRating rating={comment.rating.rating} />
                      </div>
                    )}
                  </div>
                </div>
                <p className={styles['comments__comment-text']}>{comment.rating.comment}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default Comments;
