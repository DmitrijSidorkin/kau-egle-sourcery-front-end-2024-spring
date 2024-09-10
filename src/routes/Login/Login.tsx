import { Auth } from '@/components/Auth/Auth';
import styles from './Login.module.scss';

export function Login() {
  return (
    <main>
      <div className={styles.login}>
        <Auth />
      </div>
    </main>
  );
}
