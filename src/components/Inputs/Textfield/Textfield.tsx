import { useState } from 'react';
import classNames from 'classnames';
import { IconSearchFilled } from '@/assets/icons';
import styles from './Textfield.module.scss';

interface TextfieldProps {
  name: string;
  placeholder: string;
  labelText: string;
  isSearchInput?: boolean;
  isDisabled?: boolean;
  type?: string;
  ariaLabel?: string;
  autoComplete?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Textfield({
  name,
  placeholder,
  labelText,
  isSearchInput,
  isDisabled,
  type,
  ariaLabel,
  autoComplete,
  value,
  onChange,
}: TextfieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  return (
    <label htmlFor={`${name}Input`} className={styles.textfield__label} aria-label={ariaLabel}>
      <p className={styles['textfield__label-text']}>{labelText}</p>
      <div
        className={classNames(
          styles['textfield__input-container'],
          { [styles['textfield__input-container--focus']]: isFocused },
          { [styles['textfield__input-container--disabled']]: isDisabled }
        )}>
        {isSearchInput && (
          <span className={styles['textfield__icon-container']}>
            <IconSearchFilled />
          </span>
        )}
        <input
          type={type}
          className={styles.textfield__input}
          id={`${name}Input`}
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          disabled={isDisabled}
          value={value}
          onChange={onChange}
        />
      </div>
    </label>
  );
}
export default Textfield;
