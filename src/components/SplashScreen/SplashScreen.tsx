import { LunchAppLogo } from '@/assets/icons';
import styles from './SplashScreen.module.scss';

function SplashScreen() {
  return (
    <div className={styles['splash-screen']}>
      <div className={styles['splash-screen__logo-container']}>
        <div className={styles['splash-screen__icon']}>
          <LunchAppLogo />
        </div>
      </div>
    </div>
  );
}
export default SplashScreen;
