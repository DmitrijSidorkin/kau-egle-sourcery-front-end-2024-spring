import { useContext, useEffect, useState } from 'react';
import { MenuAndVendorsContext, MenuAndVendorsContextType } from '@/context/MenuAndVendorsContext';
import { SortOrder } from '@/utils/calcMealRatings/enum';
import { calcMealRatings } from '@/utils/calcMealRatings/calcMealRatings';
import styles from './SortByButtons.module.scss';

function SortByButtons() {
  const { meals, setMeals, ratings } = useContext<MenuAndVendorsContextType>(MenuAndVendorsContext);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Asc);
  const [activeButton, setActiveButton] = useState('');

  const toggleSortOrder = (currentOrder: SortOrder): SortOrder =>
    currentOrder === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc;

  const sortByPopularity = () => {
    const sorted = [...meals];
    const currentOrder = toggleSortOrder(sortOrder);

    if (currentOrder === 'asc') {
      sorted.sort((a, b) => a.ordersCount - b.ordersCount);
    } else {
      sorted.sort((a, b) => b.ordersCount - a.ordersCount);
    }

    setMeals(sorted);
    setSortOrder(currentOrder);
    setActiveButton('popularity');
  };

  useEffect(() => {
    sortByPopularity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortByPrice = () => {
    const sorted = [...meals];
    const currentOrder = toggleSortOrder(sortOrder);

    if (currentOrder === 'asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else {
      sorted.sort((a, b) => b.price - a.price);
    }

    setMeals(sorted);
    setSortOrder(currentOrder);
    setActiveButton('price');
  };

  const sortByRatings = () => {
    const currentOrder = toggleSortOrder(sortOrder);
    const sortedMeals = [...meals]
      .map((meal) => ({ ...meal, ...calcMealRatings(ratings, meal.id) }))
      .sort((a, b) => {
        if (a.averageRating !== null && b.averageRating !== null) {
          if (sortOrder === 'asc') {
            return a.averageRating - b.averageRating || a.totalNrRatings - b.totalNrRatings;
          }
          return b.averageRating - a.averageRating || b.totalNrRatings - a.totalNrRatings;
        }
        if (a.averageRating === null && b.averageRating === null) {
          return b.totalNrRatings - a.totalNrRatings;
        }
        if (a.averageRating === null) {
          return sortOrder === 'asc' ? -1 : 1;
        }
        if (b.averageRating === null) {
          return sortOrder === 'asc' ? 1 : -1;
        }
        return sortOrder === 'asc' ? -1 : 1;
      });
    setMeals(sortedMeals);
    setSortOrder(currentOrder);
    setActiveButton('ratings');
  };

  return (
    <div className={styles['sorting__sort-row']}>
      <p className={styles.sorting__label}>Sort By</p>
      <button
        onClick={sortByPopularity}
        type="button"
        className={`${styles.sorting__variables} ${activeButton === 'popularity' ? styles['sorting__variables--active'] : ''}`}>
        Popularity
      </button>
      <button
        onClick={sortByPrice}
        type="button"
        className={`${styles.sorting__variables} ${activeButton === 'price' ? styles['sorting__variables--active'] : ''}`}>
        Price
      </button>
      <button
        onClick={sortByRatings}
        type="button"
        className={`${styles.sorting__variables} ${activeButton === 'ratings' ? styles['sorting__variables--active'] : ''}`}>
        Rating
      </button>
    </div>
  );
}

export default SortByButtons;
