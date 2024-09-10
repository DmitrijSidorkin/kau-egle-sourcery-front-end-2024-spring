import classNames from 'classnames';
import { SortOrder } from '../Enums';
import { ArrowDownwardFilled } from '@/assets/icons';
import styles from '../OrderHistoryTable.module.scss';

interface OrderHistoryHeaderButtonsProps {
  label: string;
  value: 'date' | 'summary' | 'vendor' | 'price';
  clickedInput: string;
  orderToSort: SortOrder;
  onSortChange: (value: 'date' | 'summary' | 'vendor' | 'price') => void;
}

function OrderHistoryHeaderButtons({
  label,
  value,
  clickedInput,
  orderToSort,
  onSortChange,
}: OrderHistoryHeaderButtonsProps) {
  const isActive = clickedInput === value;
  const isDesc = orderToSort === SortOrder.Desc;
  return (
    <button
      className={classNames(styles['history-table__date-name--btn'], {
        [styles['history-table__date-name--btn--active']]: isActive,
      })}
      onClick={() => onSortChange(value)}
      type="button"
      aria-label={`Sort meals by ${label} button`}>
      {label}
      <span
        className={classNames(styles['history-table__arrow-span'], {
          [styles['history-table__arrow-span--rotated']]: isActive && isDesc,
        })}>
        <ArrowDownwardFilled />
      </span>
    </button>
  );
}

export default OrderHistoryHeaderButtons;
