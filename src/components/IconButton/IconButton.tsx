import { IconTertiary } from '@/assets/icons';
import { Size, Variant } from './Enums';
import styles from './IconButton.module.scss';

type IconButtonProps = {
  size?: Size;
  variant?: Variant;
  disabled?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
};

const sizeClasses = {
  [Size.SMALL]: styles.sm,
  [Size.MEDIUM]: styles.md,
};

const variantClasses = {
  [Variant.ACCENT]: styles.accent,
  [Variant.OUTLINED]: styles.outlined,
  [Variant.TERTIARY]: styles.tertiary,
};

function IconButton({
  size = Size.MEDIUM,
  variant = Variant.TERTIARY,
  disabled = false,
  icon = <IconTertiary />,
  onClick,
}: IconButtonProps) {
  const sizeClass = sizeClasses[size];
  const variantClass = variantClasses[variant];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${sizeClass} ${variantClass} ${disabled ? styles.disabled : ''}`}>
      {icon}
    </button>
  );
}

export default IconButton;
