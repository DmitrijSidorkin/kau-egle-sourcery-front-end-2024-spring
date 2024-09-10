import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { SideNav } from '../../components/SideNav/SideNav';
import { useAuth } from '@/context/AuthContext';
import PageHeader from '../../components/PageHeader/PageHeader';
import ProfileCard from '@/components/ProfileCard/ProfileCard';
import PageFooter from '@/components/PageFooter/PageFooter';
import styles from './Root.module.scss';

interface RootProps {
  routeTitle: Record<string, string>;
  routeSubtitle: Record<string, string> | Record<string, () => string>;
}

export function Root({ routeTitle, routeSubtitle }: RootProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const { pathname } = location;
  const title = routeTitle[pathname];
  let subtitle = '';

  if (typeof routeSubtitle[pathname] === 'function') {
    subtitle = (routeSubtitle[pathname] as () => string)();
  } else {
    subtitle = routeSubtitle[pathname] as string;
  }

  if (isAuthenticated) {
    return (
      <div className={styles['page-layout']}>
        <SideNav />
        <div className={styles['page-layout__main-layout']}>
          <div className={styles['page-layout__column']}>
            <div className={styles['page-layout__row']}>
              <div className={styles['page-layout__row-header-container']}>
                <div className={styles['page-layout__row-header']}>
                  <PageHeader title={title || ''} subtitle={subtitle || ''} />
                </div>
              </div>
              <ProfileCard />
            </div>
            <main className={styles['page-layout__row-main']}>
              <Outlet />
            </main>
          </div>
          <PageFooter />
        </div>
      </div>
    );
  }
  return <Navigate to="/login" replace />;
}
