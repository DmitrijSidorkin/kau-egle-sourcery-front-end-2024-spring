import { Link } from 'react-router-dom';
import { IconArrowForwardFilled } from '@/assets/icons';
import styles from './LinkButton.module.scss';

interface LinkButtonProps {
  text: string;
  link: string;
}
function LinkButton({ text, link }: LinkButtonProps) {
  return (
    <Link className={styles['link']} to={link}>
      {text}
      <span className={styles['link__icon']}>
        <IconArrowForwardFilled />
      </span>
    </Link>
  );
}
export default LinkButton;
