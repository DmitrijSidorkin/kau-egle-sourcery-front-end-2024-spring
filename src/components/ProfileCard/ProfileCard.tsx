import { useAuth } from '@/context/AuthContext';
import avatarImage from '../../assets/ProfileCard/avatar.jpg';
import cartIcon from '../../assets/ProfileCard/cart-icon.svg';
import { LogoutDropdown } from './LogoutDropdown/LogoutDropdown';
import styles from './ProfileCard.module.scss';

function ProfileCard() {
  const { itemsInCart } = useAuth();

  return (
    <div className={styles['profile-card']}>
      <div className={styles['profile-card__inner-card']}>
        <div className={styles['profile-card__user-info']}>
          <figure className={styles['profile-card__avatar-container']}>
            <img
              className={styles['profile-card__avatar-img']}
              src={avatarImage}
              alt="User's profile avatar"
              height="32px"
              width="32px"
            />
            <div className={styles['profile-card__dropdown-img']}>
              <LogoutDropdown />
            </div>
          </figure>
          <div className={styles['profile-card__title']}>Ernestas Grabliauskas</div>
        </div>
        <div className={styles['profile-card__balance-row']}>
          <div className={styles['profile-card__price-sum']}>
            <div>Balance</div>
            <div>&#8364;64,32</div>
          </div>
          <figure className={styles['profile-card__cart-container']}>
            <img src={cartIcon} alt="Profile card icon" height="32px" width="32px" />
            <figcaption
              className={`${styles['profile-card__items-number']} ${itemsInCart >= 10 && styles['profile-card__items-number--long-number']}`}>
              {itemsInCart}
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
