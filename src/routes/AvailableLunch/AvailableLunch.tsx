import AvailableFood from '@/components/AvailableFood/AvailableFood';
import { MenuAndVendorsContextProvider } from '@/context/MenuAndVendorsContext';
import styles from './AvailableLunch.module.scss';

export function AvailableLunch() {
  return (
    <div className={styles['available-lunch']}>
      <MenuAndVendorsContextProvider>
        <AvailableFood />
      </MenuAndVendorsContextProvider>
    </div>
  );
}
