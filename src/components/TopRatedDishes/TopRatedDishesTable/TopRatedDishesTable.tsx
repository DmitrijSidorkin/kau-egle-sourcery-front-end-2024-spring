/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext, useEffect, useState } from 'react';
import TopRatedDishesRow from '../TopRatedDishesRow/TopRatedDishesRow';
import { calcMealRatings } from '@/utils/calcMealRatings/calcMealRatings';
import { Meal } from '../types';
import { sortRatingsTable } from '@/utils/sortRatingsTable';
import TablePagination from '@/components/Pagination/Pagination';
import { MenuAndVendorsContext, MenuAndVendorsContextType } from '@/context/MenuAndVendorsContext';
import CommentsCardModal from '../CommentsCardModal/CommentsCardModal';
import { SortOrder } from '@/components/OrderHistoryTable/OrderHistoryTable/Enums';
import TopRatedDishesHeaderButtons from './TopRatedDishesHeaderButtons/TopRatedDishesHeaderButtons';
import { SortableFields } from './typesDishes';
import styles from './TopRatedDishesTable.module.scss';

function TopRatedDishesTable() {
  const { meals, vendors, ratings } = useContext<MenuAndVendorsContextType>(MenuAndVendorsContext);
  const [sortedMealsArray, setSortedMealsArray] = useState(meals);
  const [clickedInput, setClickedInput] = useState<SortableFields>('Title');
  const [orderToSort, setOrderToSort] = useState<SortOrder>(SortOrder.Asc);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSizeOptions, setPageSizeOptions] = useState<number>(5);
  const [selectedDish, setSelectedDish] = useState<Meal | null>(null);

  useEffect(() => {
    const newSortedMealsArray = sortRatingsTable(
      meals,
      vendors,
      ratings,
      clickedInput,
      orderToSort,
      calcMealRatings
    );
    setSortedMealsArray(newSortedMealsArray);
  }, [meals, vendors, ratings, clickedInput, orderToSort]);

  useEffect(() => {
    setCurrentPage(0);
  }, [pageSizeOptions]);

  const totalPages = meals.length;
  const startPagination = currentPage * pageSizeOptions;
  const endPagination = Math.min(startPagination + pageSizeOptions, meals.length);

  const paginationDisplayMeals = sortedMealsArray.slice(
    currentPage * pageSizeOptions,
    (currentPage + 1) * pageSizeOptions
  );

  const handleSortChange = (value: SortableFields) => {
    setClickedInput(value);
    setOrderToSort((prevOrder) => (prevOrder === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc));
  };

  return (
    <>
      <table className={styles['ratings-table']}>
        <caption className={styles['ratings-table__caption']}>Top Rated Dishes</caption>
        <thead className={styles['ratings-table__table-head']}>
          <tr className={styles['ratings-table__table-row']}>
            <th className={styles['ratings-table__dish-head']}>
              <TopRatedDishesHeaderButtons
                label="Dish"
                value="Title"
                clickedInput={clickedInput}
                orderToSort={orderToSort}
                onSortChange={handleSortChange}
              />
            </th>
            <th className={styles['ratings-table__vendor-head']}>
              <TopRatedDishesHeaderButtons
                label="Vendor"
                value="Vendor"
                clickedInput={clickedInput}
                orderToSort={orderToSort}
                onSortChange={handleSortChange}
              />
            </th>
            <th className={styles['ratings-table__rating-head']}>
              <TopRatedDishesHeaderButtons
                label="Rating"
                value="Rating"
                clickedInput={clickedInput}
                orderToSort={orderToSort}
                onSortChange={handleSortChange}
              />
            </th>
            <th className={styles['ratings-table__rating-empty']} />
          </tr>
        </thead>
        <tbody className={styles['ratings-table__table-body']}>
          {paginationDisplayMeals.map((meal) => {
            const mealRatings = calcMealRatings(ratings, meal.id);
            return (
              <TopRatedDishesRow
                key={meal.id}
                dish={meal}
                vendor={vendors}
                mealRatings={mealRatings}
                onCommentsClick={() => setSelectedDish(meal)}
              />
            );
          })}
        </tbody>
        <tfoot className={styles['ratings-table__table-footer']}>
          <tr>
            <td aria-label="Table Pagination">
              <TablePagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                pageSizeOptions={pageSizeOptions}
                setPageSizeOptions={setPageSizeOptions}
                startPagination={startPagination}
                endPagination={endPagination}
              />
            </td>
          </tr>
        </tfoot>
      </table>
      {selectedDish && (
        <CommentsCardModal
          dish={selectedDish}
          vendor={vendors}
          mealRatings={calcMealRatings(ratings, selectedDish.id)}
          onClose={() => setSelectedDish(null)}
        />
      )}
    </>
  );
}

export default TopRatedDishesTable;
