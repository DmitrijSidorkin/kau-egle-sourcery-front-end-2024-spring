import { useContext, useEffect, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { MenuAndVendorsContext, MenuAndVendorsContextType } from '@/context/MenuAndVendorsContext';
import { useAuth } from '@/context/AuthContext';
import TablePagination from '@/components/Pagination/Pagination';
import { sortHistoryTable, sortSummaryByType } from '@/utils/sortRatingsTable';
import { SortOrder } from './Enums';
import OrderHistoryHeaderButtons from './OrderHistoryHeaderButtons/OrderHistoryHeaderButtons';
import { OrderHisMeal } from './types';
import OrderHistoryRows from './OrderHistoryRows/OrderHistoryRows';
import styles from './OrderHistoryTable.module.scss';

function OrderHistoryTable() {
  const { currentUserData } = useAuth();
  const { meals, vendors } = useContext<MenuAndVendorsContextType>(MenuAndVendorsContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSizeOptions, setPageSizeOptions] = useState<number>(5);
  const [orderToSort, setOrderToSort] = useState<SortOrder>(SortOrder.Asc);
  const [clickedInput, setClickedInput] = useState<'date' | 'summary' | 'vendor' | 'price'>('date');

  const orderHistoryMealsArray: OrderHisMeal[] = useMemo(
    () =>
      (currentUserData.orderHistory ?? []).map((order) => {
        const mealDetails = meals.filter((meal) => (order.mealsIds ?? []).includes(meal.id));
        const totalMealPrice = mealDetails.reduce((acc, meal) => acc + meal.price, 0);
        const vendorCount = mealDetails.length;
        const summary = sortSummaryByType(mealDetails);
        return {
          date: order.date ?? '',
          mealsIds: order.mealsIds ?? [],
          mealDetails,
          totalMealPrice,
          vendorCount,
          summary,
        };
      }),
    [currentUserData.orderHistory, meals]
  );

  const [sortedMealsArray, setSortedMealsArray] = useState<OrderHisMeal[]>(orderHistoryMealsArray);

  useEffect(() => {
    const newSortedMealsArray = sortHistoryTable(orderHistoryMealsArray, clickedInput, orderToSort);
    if (newSortedMealsArray.length > 0) {
      setSortedMealsArray(newSortedMealsArray);
    } else {
      const emptyOrder = [
        {
          date: '',
          mealsIds: [],
          mealDetails: [],
          totalMealPrice: 0,
          vendorCount: 0,
          summary: '',
        },
      ];
      setSortedMealsArray(emptyOrder);
    }
  }, [orderHistoryMealsArray, clickedInput, orderToSort]);

  useEffect(() => {
    setCurrentPage(0);
  }, [pageSizeOptions]);

  const totalPages = orderHistoryMealsArray.length;
  const startPagination = currentPage * pageSizeOptions;
  const endPagination = Math.min(startPagination + pageSizeOptions, orderHistoryMealsArray.length);

  const paginationDisplayMeals = useMemo(
    () =>
      sortedMealsArray.slice(currentPage * pageSizeOptions, (currentPage + 1) * pageSizeOptions),
    [sortedMealsArray, currentPage, pageSizeOptions]
  );

  const handleSortChange = (value: 'date' | 'summary' | 'vendor' | 'price') => {
    setClickedInput(value);
    setOrderToSort((prevOrder) => (prevOrder === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc));
  };

  return (
    <table className={styles['history-table']}>
      <caption className={styles['history-table__caption']}>Order History</caption>
      <thead>
        <tr className={styles['history-table__head-row']}>
          <th className={styles['history-table__date-name']}>
            <OrderHistoryHeaderButtons
              label="Date"
              value="date"
              clickedInput={clickedInput}
              orderToSort={orderToSort}
              onSortChange={handleSortChange}
            />
          </th>
          <th className={styles['history-table__summary-name']}>
            <OrderHistoryHeaderButtons
              label="Order Summary"
              value="summary"
              clickedInput={clickedInput}
              orderToSort={orderToSort}
              onSortChange={handleSortChange}
            />
          </th>
          <th className={styles['history-table__vendor-name']}>
            <OrderHistoryHeaderButtons
              label="Vendor"
              value="vendor"
              clickedInput={clickedInput}
              orderToSort={orderToSort}
              onSortChange={handleSortChange}
            />
          </th>
          <th className={styles['history-table__price-name']}>
            <OrderHistoryHeaderButtons
              label="Total Price"
              value="price"
              clickedInput={clickedInput}
              orderToSort={orderToSort}
              onSortChange={handleSortChange}
            />
          </th>
        </tr>
      </thead>
      <tbody className={styles['history-table__tbody']}>
        {paginationDisplayMeals.map((order: OrderHisMeal) => (
          <OrderHistoryRows key={uuid()} order={order} meals={meals} vendors={vendors} />
        ))}
      </tbody>
      <tfoot className={styles['history-table__table-footer']}>
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
  );
}
export default OrderHistoryTable;
