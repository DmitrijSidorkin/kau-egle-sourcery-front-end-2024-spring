import classNames from 'classnames';
import { ArrowDownwardFilled } from '@/assets/icons';
import { SortOrder } from '@/components/OrderHistoryTable/OrderHistoryTable/Enums';
import styles from '../TopRatedDishesTable.module.scss';
import { SortableFields } from '../typesDishes';

interface TopRatedDishesHeaderButtonsProps {
  label: string;
  value: SortableFields;
  clickedInput: string;
  orderToSort: SortOrder;
  onSortChange: (value: SortableFields) => void;
}

function TopRatedDishesHeaderButtons({
  label,
  value,
  clickedInput,
  orderToSort,
  onSortChange,
}: TopRatedDishesHeaderButtonsProps) {
  const isActive = clickedInput === value;
  const isDesc = orderToSort === SortOrder.Desc;
  return (
    <button
      className={classNames(styles['dish-head__btn'], {
        [styles['dish-head__btn--active']]: isActive,
      })}
      onClick={() => onSortChange(value)}
      type="button"
      aria-label={`Sort meals by ${label} button`}>
      {label}
      <span
        className={classNames(styles['ratings-table__arrow-span'], {
          [styles['ratings-table__arrow-span--rotated']]: isActive && isDesc,
        })}>
        <ArrowDownwardFilled />
      </span>
    </button>
  );
}

export default TopRatedDishesHeaderButtons;
