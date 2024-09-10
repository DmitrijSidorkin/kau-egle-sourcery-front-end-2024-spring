import TopRatedDishes from '@/components/TopRatedDishes/TopRatedDishes';
import TopRatedVendors from '@/components/TopRatedVendors/TopRatedVendors';
import { MenuAndVendorsContextProvider } from '@/context/MenuAndVendorsContext';
import styles from './Ratings.module.scss';

export function Ratings() {
  return (
    <main>
      <div className={styles['ratings-menu']}>
        <MenuAndVendorsContextProvider>
          <TopRatedVendors />
          <TopRatedDishes />
        </MenuAndVendorsContextProvider>
      </div>
    </main>
  );
}
