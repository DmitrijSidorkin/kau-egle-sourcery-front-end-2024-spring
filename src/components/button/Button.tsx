import React from 'react';
import classNames from 'classnames';
import { ButtonVariants, ButtonSizes, IconPosition } from './Enum';
import styles from './Button.module.scss';

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariants;
  size?: ButtonSizes;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
};

function Button({
  children,
  variant = ButtonVariants.Primary,
  size = ButtonSizes.Large,
  disabled = false,
  icon,
  iconPosition = icon ? IconPosition.Left : IconPosition.Null,
  type = 'button',
  onClick,
}: ButtonProps) {
  const buttonClasses = classNames(
    styles.btn,
    styles[variant],
    styles[size],
    styles[`${size}--${iconPosition}`]
  );
  const iconContainerClasses = classNames(
    styles['btn__icon-container'],
    styles[`btn__icon-container--${size}`],
    icon && styles[`btn__icon-container--${size}--${iconPosition}`]
  );
  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} className={buttonClasses} disabled={disabled} onClick={onClick}>
      {iconPosition === IconPosition.Left && icon && (
        <span className={iconContainerClasses}>{icon}</span>
      )}
      <span>{children}</span>
      {iconPosition === IconPosition.Right && icon && (
        <span className={iconContainerClasses}>{icon}</span>
      )}
    </button>
  );
}

export default Button;
