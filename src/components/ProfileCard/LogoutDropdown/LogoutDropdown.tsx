import { useState } from 'react';
import { Logout } from '../../Auth/Logout/Logout';
import { LogoutDropdownIcon } from '@/assets/icons';
import styles from './LogoutDropdown.module.scss';

export function LogoutDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div>
      <button
        className={styles.dropdown}
        type="button"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-label="Open Dropdown">
        <LogoutDropdownIcon />
      </button>
      {isOpen && <Logout />}
    </div>
  );
}
