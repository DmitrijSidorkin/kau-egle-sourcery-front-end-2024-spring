import { v4 as uuid } from 'uuid';
import { useEffect, useRef, RefObject, useState } from 'react';
import styles from './DropdownList.module.scss';

interface DropdownListProps {
  originalPlaceholderText: string;
  selectedOptionValue: string;
  optionsArray: string[];
  setOptionState: (event: HTMLButtonElement) => void;
  handleButtonFocus: () => void;
  onClickOutside: () => void;
}

function DropdownList({
  originalPlaceholderText,
  selectedOptionValue,
  optionsArray,
  setOptionState,
  handleButtonFocus,
  onClickOutside,
}: DropdownListProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  function useOutsideAlerter(ref: RefObject<HTMLElement>) {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          onClickOutside();
          setIsExpanded(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(dropdownRef);

  return (
    <div ref={dropdownRef} className={styles['option-list']}>
      <button
        key={uuid()}
        type="button"
        className={styles['option-list__list-item']}
        value=""
        aria-haspopup="listbox"
        aria-expanded={isExpanded}
        aria-controls="dropdown-list"
        onClick={(event) => {
          setOptionState(event.currentTarget);
          handleButtonFocus();
          setIsExpanded(true);
        }}>
        {originalPlaceholderText}
      </button>
      {optionsArray.map((option) => (
        <button
          key={uuid()}
          type="button"
          className={`${styles['option-list__list-item']} ${
            option === selectedOptionValue ? styles['option-list__list-item--active'] : ''
          }`}
          aria-label={option}
          value={option}
          onClick={(event) => {
            setOptionState(event.currentTarget);
            handleButtonFocus();
            setIsExpanded(false);
          }}>
          {option}
        </button>
      ))}
    </div>
  );
}
export default DropdownList;
