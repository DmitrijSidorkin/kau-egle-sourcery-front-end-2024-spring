import { Dispatch, SetStateAction } from 'react';
import { CheckCircleOutlineIcon, ErrorOutlineIcon, InfoOutlineIcon } from '@/assets/icons';
import IconButton from '@/components/IconButton/IconButton';
import { Variant } from './Enums';
import styles from './PopupToast.module.scss';

const variantClasses = {
  [Variant.SUCCESS]: styles['popup--success'],
  [Variant.WARNING]: styles['popup--warning'],
  [Variant.INFO]: styles['popup--info'],
};
const variantIcons = {
  [Variant.SUCCESS]: CheckCircleOutlineIcon,
  [Variant.WARNING]: ErrorOutlineIcon,
  [Variant.INFO]: InfoOutlineIcon,
};

interface PopupProps {
  handleStateChange: Dispatch<SetStateAction<boolean>>;
  message: string;
  variant: Variant;
}

function PopupToast({ handleStateChange, message, variant = Variant.INFO }: PopupProps) {
  const Icon = variantIcons[variant];
  return (
    <div className={`${styles.popup} ${variantClasses[variant]} `}>
      <Icon />
      <p className={styles.popup__text}>{message}</p>
      <div className={styles['popup__button-container']}>
        <IconButton onClick={() => handleStateChange(false)} />
      </div>
    </div>
  );
}
export default PopupToast;
