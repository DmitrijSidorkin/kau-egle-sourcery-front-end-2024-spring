import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import classNames from 'classnames';
import AvailableFoodRow from '../AvailableFoodRow/AvailableFoodRow';
import TablePagination from '@/components/Pagination/Pagination';
import { AvailableLunch, UserData } from '@/context/AuthContext';
import styles from './AvailableFoodTable.module.scss';

export interface AvailableFoodTableProps {
  availableLunch: AvailableLunch[];
  fetchedUsers: UserData[];
  setReserved: Dispatch<SetStateAction<boolean>>;
}

function AvailableFoodTable({
  fetchedUsers,
  availableLunch,
  setReserved,
}: AvailableFoodTableProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSizeOptions, setPageSizeOptions] = useState(5);

  const totalPages = availableLunch.length;
  const startPagination = currentPage * pageSizeOptions;
  const endPagination = Math.min(startPagination + pageSizeOptions, availableLunch.length);

  const paginationDisplayLunches = availableLunch.slice(startPagination, endPagination);

  useEffect(() => {
    const reservation: AvailableLunch | null = JSON.parse(
      localStorage.getItem('reservedMeal') || 'null'
    );

    if (reservation) {
      setReserved(true);
    }
  }, []);

  const handleClick = (reservedMeal: AvailableLunch) => {
    setReserved(true);
    localStorage.setItem('reservedMeal', JSON.stringify(reservedMeal));
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [pageSizeOptions]);

  return (
    <table className={styles['available-lunch-table']}>
      <caption className={styles['available-lunch-table__caption']}>Available Orders</caption>
      <thead
        className={classNames(
          styles['available-lunch-table__table-head'],
          styles['available-lunch-table__shared-head']
        )}>
        <tr className={styles['available-lunch-table__table-row']}>
          <th className={styles['available-lunch-table__order-head']}>Order Summary</th>
          <th className={styles['available-lunch-table__vendor-head']}>Vendor</th>
          <th className={styles['available-lunch-table__user-head']}>Take It From</th>
        </tr>
      </thead>
      <tbody className={styles['available-lunch-table__table-body']}>
        {paginationDisplayLunches.map((lunch) => (
          <AvailableFoodRow
            handleClick={handleClick}
            key={lunch.id}
            availableLunch={lunch}
            user={fetchedUsers.find((user) => user.id === lunch.userId) || undefined}
          />
        ))}
      </tbody>
      <tfoot className={styles['available-lunch-table__table-footer']}>
        <tr>
          <td aria-label="Table Pagination" colSpan={3}>
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

export default AvailableFoodTable;
