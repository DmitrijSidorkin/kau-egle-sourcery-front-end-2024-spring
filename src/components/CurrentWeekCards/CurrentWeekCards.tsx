import { useContext, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import {
  Meal,
  MenuAndVendorsContext,
  MenuAndVendorsContextType,
  Vendor,
} from '@/context/MenuAndVendorsContext';
import { useAuth } from '@/context/AuthContext';
import confirmedOrders from './utils/confirmedOrders';
import WeekCard from './WeekCard/WeekCard';
import { DayNames } from './Enum';
import { CheckCircle } from '@/assets/icons';
import styles from './CurrentWeekCards.module.scss';

export interface ConfirmedOrders {
  day: string;
  orders: number[];
}

function CurrentWeekCards() {
  const { setMeals, setVendors } = useContext<MenuAndVendorsContextType>(MenuAndVendorsContext);
  const [errors, setErrors] = useState<string | null>(null);
  const { currentUserData, confirmedOrdersArray, setConfirmedOrdersArray } = useAuth();
  const dayNames = Object.values(DayNames);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = ['http://localhost:3002/vendors', 'http://localhost:3002/meals'];
        const responses = await Promise.all(urls.map((url) => fetch(url)));
        const results = await Promise.all(
          responses.map((res) => {
            if (!res.ok) throw new Error(`Error fetching data from ${res.url}`);
            return res.json();
          })
        );
        const [vendorData, mealData] = results;
        setVendors(
          vendorData.map((vendor: Vendor) => ({
            ...vendor,
            id: +vendor.id,
          }))
        );
        setMeals(
          mealData.map((meal: Meal) => ({
            ...meal,
            id: +meal.id,
            vendorId: +meal.vendorId,
          }))
        );
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrors(error.message);
        } else {
          setErrors('An unknown error occurred');
        }
      }
    };
    fetchData();
  }, [setMeals, setVendors]);

  useEffect(() => {
    setConfirmedOrdersArray(confirmedOrders(currentUserData));
  }, [currentUserData, setConfirmedOrdersArray]);

  return (
    <div className={styles['current-week']}>
      <h3 className={styles['current-week__title']}>This week</h3>
      {errors ? (
        <p className={styles['current-week__error']}>{errors}</p>
      ) : (
        <div className={styles['current-week__content-wrapper']}>
          <div className={styles['current-week__content']}>
            <div className={styles['current-week__days']}>
              {dayNames.map((day) => {
                const orderedFood = confirmedOrdersArray.find((order) => order.day === day);
                const isFoodOrdered =
                  orderedFood && orderedFood.orders && orderedFood.orders.length > 0;
                return (
                  <div key={uuid()} className={styles['current-week__day-name']}>
                    <p>{day}</p>
                    {isFoodOrdered && <CheckCircle />}
                    {day === DayNames.Friday && (
                      <span className={styles['current-week__free']}>Free</span>
                    )}
                  </div>
                );
              })}
            </div>
            <div className={styles['current-week__cards']}>
              {confirmedOrdersArray.map((orderDay) => (
                <WeekCard key={uuid()} orderDay={orderDay} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default CurrentWeekCards;
