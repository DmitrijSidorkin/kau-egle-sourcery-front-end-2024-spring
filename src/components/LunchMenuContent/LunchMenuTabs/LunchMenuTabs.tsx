import { v4 as uuid } from 'uuid';
import Tab from './Tab/Tab';
import styles from './LunchMenuTabs.module.scss';

interface LunchMenuTabsProps {
  filterSearch: (tab: HTMLButtonElement) => void;
  dayNames: string[];
  currentDay: number;
}

function LunchMenuTabs({ filterSearch, dayNames, currentDay }: LunchMenuTabsProps) {
  return (
    <div className={styles['menu-tabs']}>
      <div className={styles['menu-tabs__tabs']}>
        {dayNames.map((dayName, index) => (
          <Tab
            key={uuid()}
            dayName={dayName}
            changeTab={filterSearch}
            isDisabled={index < currentDay - 1}
          />
        ))}
      </div>
    </div>
  );
}
export default LunchMenuTabs;
