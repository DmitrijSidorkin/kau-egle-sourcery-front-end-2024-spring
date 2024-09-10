import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LogoutIcon } from '@/assets/icons';
import styles from './Logout.module.scss';

export function Logout() {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const handleOnclick = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <button type="button" className={styles.logout} onClick={handleOnclick}>
      <div className={styles['logout__content-wrapper']}>
        <LogoutIcon />
        <div className={styles.logout__text}>
          <p>Log Out</p>
        </div>
      </div>
    </button>
  );
}
