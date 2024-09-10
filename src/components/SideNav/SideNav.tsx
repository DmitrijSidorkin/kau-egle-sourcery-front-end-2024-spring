import { useState } from 'react';
import { NavigationLink } from '../NavigationLink/NavigationLink';
import {
  MenuIcon1,
  MenuIcon2,
  MenuIcon3,
  MenuIcon4,
  LunchAppLogo,
  LunchAppLogoCollapsed,
} from '@/assets/icons';
import button_left from '@/assets/icons/sidenav_button_left.svg';
import button_right from '@/assets/icons/sidenav_button_right.svg';
import styles from './SideNav.module.scss';

export function SideNav() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`${isMenuOpen ? styles['nav-container'] : styles['nav-container--collapsed']}`}>
      <div
        className={`${styles['side-nav']} ${isMenuOpen ? styles['side-nav'] : styles['side-nav--collapsed']}`}>
        <div className={styles['side-nav__container']}>
          <div className={styles['side-nav__logo-box']}>
            <div className={styles['side-nav__main-logo']}>
              {isMenuOpen ? <LunchAppLogo /> : <LunchAppLogoCollapsed />}
            </div>
          </div>
          <div className={styles['side-nav__menu']}>
            <NavigationLink to="/food-menu" Icon={MenuIcon1} text="Food Menu" />
            <NavigationLink to="/available-lunch" Icon={MenuIcon2} text="Available Lunch" />
            <NavigationLink to="/your-orders" Icon={MenuIcon3} text="Your Orders" />
            <NavigationLink to="/ratings" Icon={MenuIcon4} text="Ratings" />
          </div>
        </div>
        <button
          className={styles['side-nav__toggle-button']}
          type="button"
          onClick={toggleMenu}
          aria-label="expand"
          aria-expanded={isMenuOpen}>
          <img
            className={styles['side-nav__toggle-icon']}
            src={isMenuOpen ? button_left : button_right}
            alt=""
          />
        </button>
      </div>
    </nav>
  );
}
