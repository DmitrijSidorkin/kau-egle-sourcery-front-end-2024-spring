import { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { ButtonSizes, ButtonVariants } from '@/components/button/Enum';
import Button from '@/components/button/Button';
import { dishIcons } from '@/assets/icons/DishIcons';
import { MenuAndVendorsContext, MenuAndVendorsContextType } from '@/context/MenuAndVendorsContext';
import modifyImageUrl from '@/utils/modifyImageUrl';
import { AvailableLunch, UserData } from '@/context/AuthContext';
import styles from './AvailableFoodRow.module.scss';

export interface AvailableFoodRowProps {
  availableLunch: AvailableLunch;
  user?: UserData;
  handleClick: (reservedMeal: AvailableLunch) => void;
}

function AvailableFoodRow({ availableLunch, user, handleClick }: AvailableFoodRowProps) {
  const { meals, vendors } = useContext<MenuAndVendorsContextType>(MenuAndVendorsContext);

  const mealDetails = availableLunch.mealIds.map((mealId) => {
    const meal = meals.find((m) => m.id === mealId);
    const vendFood = meal ? vendors.find((v) => v.id === meal.vendorId) : null;
    return { meal, vendFood };
  });

  const userImgUrl = user?.img
    ? modifyImageUrl(user.img, 50)
    : '/src/assets/icons/question_mark.png';

  return (
    <tr className={styles['available-lunch-row']}>
      <td className={styles['available-lunch-row__dish-box']}>
        <div className={styles['available-lunch-row__dish-box-container-wrapper']}>
          {mealDetails.map((detail) => (
            <div key={uuid()} className={styles['available-lunch-row__dish-box-container']}>
              {detail.meal && (
                <>
                  <figure className={styles['available-lunch-row__dish-box-container-img']}>
                    <img src={dishIcons[detail.meal.dishType] || ''} alt={detail.meal.dishType} />
                  </figure>
                  <p className={styles['available-lunch-row__dish-box-container-p']}>
                    {detail.meal.title}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </td>
      <td className={styles['available-lunch-row__vendor-box']}>
        <div className={styles['available-lunch-row__vendor-box-wrapper']}>
          {mealDetails.map((detail) => (
            <p key={uuid()} className={styles['available-lunch-row__vendor-box-p']}>
              {detail.vendFood ? detail.vendFood.name.toUpperCase() : ''}
            </p>
          ))}
        </div>
      </td>
      <td className={styles['available-lunch-row__user-box']}>
        <div className={styles['available-lunch-row__user-img-container']}>
          <img
            className={styles['available-lunch-row__user-img']}
            src={userImgUrl}
            alt={user ? `${user.name} ${user.surname}` : 'user icon'}
          />
        </div>
        <p className={styles['available-lunch-row__user-box-p']}>
          {user ? `${user.name} ${user.surname}` : 'No user name'}
        </p>
      </td>
      <td className={styles['available-lunch-row__action-box']}>
        <div className={styles['available-lunch-row__button-container']}>
          <Button
            variant={ButtonVariants.Secondary}
            size={ButtonSizes.Small}
            onClick={() => handleClick(availableLunch)}>
            Reserve
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default AvailableFoodRow;
