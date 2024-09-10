import classNames from 'classnames';
import Dropdown from '../../Dropdown/Dropdown';
import Textfield from '../../Inputs/Textfield/Textfield';
import SortByButtons from './SortByButtons/SortByButtons';
import { FoodSearchCardProps } from './types';
import styles from './FoodSearchCard.module.scss';

function FoodSearchCard({
  handleDropdownChange,
  vendorNames,
  selectedDropdownOption,
  setSearchTerm,
}: FoodSearchCardProps) {
  return (
    <div className={styles['search-card']}>
      <form onSubmit={(event) => event.preventDefault()} className={styles['search-card__form']}>
        <div className={styles['search-card__input-container']}>
          <div className={styles['search-card__input']}>
            <Textfield
              name="dish"
              placeholder="Enter a dish"
              labelText="What dish are you looking for?"
              isSearchInput
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <div
            className={classNames(
              styles['search-card__input'],
              styles['search-card__input--vendors']
            )}>
            <Dropdown
              name="vendors"
              placeholderText="All Vendors"
              labelText="Vendors"
              optionsArray={vendorNames}
              selectedOptionValue={selectedDropdownOption}
              setOptionState={handleDropdownChange}
            />
          </div>
        </div>
      </form>
      <SortByButtons />
    </div>
  );
}
export default FoodSearchCard;
