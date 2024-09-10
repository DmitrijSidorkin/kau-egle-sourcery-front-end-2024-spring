import DisplayStarsRating from '@/components/DisplayStarsRating/DisplayStarsRating';
import { Vendor } from '@/context/MenuAndVendorsContext';
import styles from './VendorCard.module.scss';

interface VendorCardProps {
  vendor: Vendor;
  position: number;
}

function VendorCard({ vendor, position }: VendorCardProps) {
  const vendorRating = vendor.avgRating || null;
  return (
    <div className={styles['vendor-card']}>
      <div className={styles['vendor-card__content']}>
        <p className={styles['vendor-card__vendor-name']}>{vendor.name}</p>
        <div className={styles['vendor-card__star-container']}>
          <DisplayStarsRating rating={vendorRating} />
        </div>
        <p className={styles['vendor-card__vendor-rating']}>{vendor.avgRating?.toFixed(1)}</p>
      </div>
      <div
        className={`${styles['vendor-card__icon-container']} ${styles[`vendor-card__icon-container--top${position}`]}`}>
        <img src={`/src/assets/icons/trophy_${position}.png`} alt={`Top vendor nr.${position}`} />
      </div>
    </div>
  );
}
export default VendorCard;
