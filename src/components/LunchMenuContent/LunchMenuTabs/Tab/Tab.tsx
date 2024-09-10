import { useContext } from 'react';
import { LunchMenuContext, LunchMenuContextType } from '@/context/LunchMenuContext';
import styles from './Tab.module.scss';

interface TabProps {
  dayName: string;
  changeTab: (tab: HTMLButtonElement) => void;
  isDisabled: boolean;
}

function Tab({ changeTab, dayName, isDisabled }: TabProps) {
  const { currentTab } = useContext<LunchMenuContextType>(LunchMenuContext);
  return (
    <button
      type="button"
      className={`${styles.tab} ${currentTab === dayName ? styles.active : ''}`}
      value={`${dayName}`}
      onClick={(e) => changeTab(e.target as HTMLButtonElement)}
      disabled={isDisabled}>
      {dayName}
    </button>
  );
}
export default Tab;
