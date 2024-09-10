import { useState } from 'react';
import { ExpandMoreFilledIcon } from '@/assets/icons';
import DropdownList from './DropdownList/DropdownList';
import styles from './Dropdown.module.scss';

interface TextfieldProps {
  name: string;
  placeholderText: string;
  optionsArray: string[];
  labelText: string;
  selectedOptionValue: string;
  setOptionState: (event: HTMLButtonElement) => void;
}

function Dropdown({
  name,
  placeholderText,
  optionsArray,
  labelText,
  selectedOptionValue,
  setOptionState,
}: TextfieldProps) {
  const originalPlaceholderText = placeholderText;
  const [isButtonFocused, setIsButtonFocused] = useState(false);
  const [isOptionsListOpen, setIsOptionsListOpen] = useState(false);

  const handleButtonFocus = () => {
    setIsButtonFocused(!isButtonFocused);
    setIsOptionsListOpen(!isOptionsListOpen);
  };

  const onClickOutside = () => {
    setIsButtonFocused(false);
    setIsOptionsListOpen(false);
  };

  return (
    <label htmlFor={`${name}Dropdown`} className={styles.dropdown__label}>
      <p className={styles['dropdown__label-text']}>{labelText}</p>
      <div className={styles['dropdown__field-container']}>
        <button
          type="button"
          className={styles['dropdown__toggle-button']}
          onClick={handleButtonFocus}>
          <p className={styles['dropdown__toggle-button-text']}>
            {selectedOptionValue || placeholderText}
          </p>
          <span
            className={`${styles['dropdown__icon-container']} ${isOptionsListOpen ? styles['dropdown__icon-container--list-open'] : ''}`}>
            <ExpandMoreFilledIcon />
          </span>
        </button>

        {isButtonFocused && (
          <DropdownList
            originalPlaceholderText={originalPlaceholderText}
            selectedOptionValue={selectedOptionValue}
            optionsArray={optionsArray}
            setOptionState={setOptionState}
            handleButtonFocus={handleButtonFocus}
            onClickOutside={onClickOutside}
          />
        )}
      </div>
    </label>
  );
}

export default Dropdown;
