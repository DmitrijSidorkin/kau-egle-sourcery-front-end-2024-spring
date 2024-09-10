import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { PropsMenuCard } from './types';
import MenuCard from './MenuCard/MenuCard';
import PopupToast from '@/components/PopupToast/PopupToast';
import { Variant } from '@/components/PopupToast/Enums';
// import SplashScreen from '@/components/SplashScreen/SplashScreen';
import { useAuth } from '@/context/AuthContext';
import styles from './MenuCardList.module.scss';

function CardMenuList({ meals, errors }: PropsMenuCard): JSX.Element {
  const [taostOpenState, setToastOpenState] = useState<boolean>(false);
  const [mealNameForToast, setMealNameForToast] = useState<string>('');
  const { currentUserData } = useAuth();
  const toastMessage = `${mealNameForToast} has been added to your cart. Excellent choice!`;
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   if (meals.length > 0 || errors) {
  //     setIsLoading(false);
  //   }
  // }, [meals, errors]);

  return (
    <>
      {taostOpenState && (
        <PopupToast
          handleStateChange={setToastOpenState}
          message={toastMessage}
          variant={Variant.INFO}
        />
      )}
      <div className={styles['card-list__content']}>
        {errors && <div className={styles['card-list__error-state']}>Error message: {errors}</div>}
        {meals.map((meal) => (
          <MenuCard
            key={uuid()}
            meal={meal}
            handleToastState={setToastOpenState}
            handleToastMealName={setMealNameForToast}
            currentUserData={currentUserData}
          />
        ))}
      </div>
    </>
  );
}

export default CardMenuList;
