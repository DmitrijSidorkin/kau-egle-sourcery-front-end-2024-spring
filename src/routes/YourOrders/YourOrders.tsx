import CurrentWeekCards from '@/components/CurrentWeekCards/CurrentWeekCards';
import OrderHistory from '@/components/OrderHistoryTable/OrderHistory';
import { MenuAndVendorsContextProvider } from '@/context/MenuAndVendorsContext';
import styles from './YourOrders.module.scss';

export function YourOrders() {
  return (
    <div className={styles['your-orders']}>
      <MenuAndVendorsContextProvider>
        <CurrentWeekCards />
        <OrderHistory />
      </MenuAndVendorsContextProvider>
    </div>
  );
}
