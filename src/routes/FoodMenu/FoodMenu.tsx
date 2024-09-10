import CartCard from '@/components/CartCard/CartCard';
import LunchMenuContent from '@/components/LunchMenuContent/LunchMenuContent';
import { MenuAndVendorsContextProvider } from '@/context/MenuAndVendorsContext';
import { LunchMenuContextProvider } from '@/context/LunchMenuContext';
import styles from './FoodMenu.module.scss';

export function FoodMenu() {
  return (
    <div className={styles['food-menu']}>
      <MenuAndVendorsContextProvider>
        <LunchMenuContextProvider>
          <div className={styles['food-menu__lunch']}>
            <LunchMenuContent />
          </div>
          <div className={styles['food-menu__shopping-cart']}>
            <CartCard />
          </div>
        </LunchMenuContextProvider>
      </MenuAndVendorsContextProvider>
    </div>
  );
}
