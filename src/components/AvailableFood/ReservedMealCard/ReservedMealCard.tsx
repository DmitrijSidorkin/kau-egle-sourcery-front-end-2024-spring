import { useEffect, useContext, useState, Dispatch, SetStateAction } from 'react';
import { AvailableLunch } from '@/context/AuthContext';
import { ThumbsUp } from '@/assets/icons';
import { MenuAndVendorsContext, MenuAndVendorsContextType } from '@/context/MenuAndVendorsContext';
import Button from '@/components/button/Button';
import { ButtonSizes, ButtonVariants } from '@/components/button/Enum';
import ReservedMealDetails from './ReservedMealDetails/ReservedMealDetails';
import styles from './ReservedMealCard.module.scss';

interface ReservedMealCardProps {
  setReserved: Dispatch<SetStateAction<boolean>>;
}

function ReservedMealCard({ setReserved }: ReservedMealCardProps) {
  const [mealData, setMealData] = useState<AvailableLunch | null>(null);
  const { meals, vendors } = useContext<MenuAndVendorsContextType>(MenuAndVendorsContext);

  useEffect(() => {
    const reservedMeal: AvailableLunch | null = JSON.parse(
      localStorage.getItem('reservedMeal') || 'null'
    );
    setMealData(reservedMeal);
  }, []);

  const mealDetails = mealData
    ? mealData.mealIds.map((mealId) => {
        const meal = meals.find((m) => m.id === mealId);
        const vendFood = meal ? vendors.find((v) => v.id === meal.vendorId) : null;
        return { meal, vendFood, mealId };
      })
    : [];

  const handleClick = () => {
    localStorage.removeItem('reservedMeal');
    setMealData(null);
    setReserved(false);
  };

  return (
    <div className={styles['reserved-meal__container']}>
      <div className={styles['reserved-meal__header']}>
        <div className={styles['reserved-meal__icon-wrapper']}>
          <ThumbsUp />
        </div>
        <p className={styles['reserved-meal__title']}>
          This is your reserved meal for the Friday lunch. Enjoy!
        </p>
      </div>
      <div className={styles['reserved-meal__content']}>
        {mealDetails.map((detail) => (
          <ReservedMealDetails key={detail.mealId} detail={detail} />
        ))}
      </div>
      <div className={styles['reserved-meal__cancel-btn-wrapper']}>
        <Button onClick={handleClick} variant={ButtonVariants.Secondary} size={ButtonSizes.Medium}>
          Cancel Reservation
        </Button>
      </div>
    </div>
  );
}

export default ReservedMealCard;
