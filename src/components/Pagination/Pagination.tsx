import { ChevronLeft, ChevronRight } from '@/assets/icons';
import { Size, Variant } from '@/components/IconButton/Enums';
import IconButton from '@/components/IconButton/IconButton';
import styles from './Pagination.module.scss';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  pageSizeOptions: number;
  setPageSizeOptions: (size: number) => void;
  startPagination: number;
  endPagination: number;
}

function TablePagination({
  currentPage,
  setCurrentPage,
  totalPages,
  pageSizeOptions,
  setPageSizeOptions,
  startPagination,
  endPagination,
}: PaginationProps) {
  function handlePageBack() {
    if (startPagination === 0) {
      return;
    }
    setCurrentPage(currentPage - 1);
  }

  function handlePageForward() {
    if (endPagination === totalPages) {
      return;
    }
    setCurrentPage(currentPage + 1);
  }

  return (
    <div className={styles['pagination-row']}>
      <div className={styles['pagination-row__select-container']}>
        <label htmlFor="pageSizeSelect">
          Rows per page:
          <select
            id="pageSizeSelect"
            value={pageSizeOptions}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setPageSizeOptions(Number(e.target.value))
            }>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </label>
      </div>
      <div className={styles['pagination-row__current-page']}>
        <p>
          {startPagination + 1}-{endPagination} of {totalPages}
        </p>
      </div>
      <div className={styles['pagination-row__navigation-container']}>
        <IconButton
          size={Size.MEDIUM}
          variant={Variant.TERTIARY}
          icon={<ChevronLeft />}
          onClick={() => handlePageBack()}
          disabled={currentPage === 0}
          aria-label={currentPage === 0 ? "You're at the first page" : 'Go to previous page'}
        />
        <IconButton
          size={Size.MEDIUM}
          variant={Variant.TERTIARY}
          icon={<ChevronRight />}
          onClick={() => handlePageForward()}
          disabled={(currentPage + 1) * pageSizeOptions >= totalPages}
          aria-label={
            (currentPage + 1) * pageSizeOptions >= totalPages
              ? "You're at the last page"
              : 'Go to next page'
          }
        />
      </div>
    </div>
  );
}
export default TablePagination;
