import { NavLink } from 'react-router-dom';
import styles from '../SideNav/SideNav.module.scss';

interface NavigationLinkProps {
  to: string;
  Icon: React.ElementType;
  text: string;
}

export function NavigationLink({ to, Icon, text }: NavigationLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${styles['side-nav__menu-link']} ${isActive ? styles['side-nav__menu-link--selected'] : ''}`
      }>
      <div className={styles['side-nav__menu-icon-box']}>
        <Icon className={styles['side-nav__menu-icon']} />
      </div>
      <div>{text}</div>
    </NavLink>
  );
}
