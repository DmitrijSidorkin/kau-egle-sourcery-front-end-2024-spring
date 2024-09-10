import { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { MenuAndVendorsContext, MenuAndVendorsContextType } from '@/context/MenuAndVendorsContext';
import calcVendorRating from '@/utils/calcVendorRating';
import VendorCard from './VendorCard/VendorCard';
import styles from './TopRatedVendors.module.scss';

function TopRatedVendors() {
  const { vendors, meals, ratings } = useContext<MenuAndVendorsContextType>(MenuAndVendorsContext);
  const vendorsCopy = [...vendors];
  vendorsCopy.forEach((vendor) => {
    const vendorRating = calcVendorRating(meals, ratings, vendor.id);
    vendor.avgRating = vendorRating.avgRating;
    vendor.ratingsCount = vendorRating.ratingsCount;
  });
  const topVendors = vendorsCopy
    .sort((a, b) => {
      if (b.avgRating === a.avgRating) {
        return (b.ratingsCount || 0) - (a.ratingsCount || 0);
      }
      return (b.avgRating || 0) - (a.avgRating || 0);
    })
    .slice(0, 3);
  return (
    <div className={styles['top-vendors']}>
      <h2 className={styles['top-vendors__title']}>Top Rated Vendors</h2>
      <div className={styles['top-vendors__vendors-container']}>
        {topVendors.map((vendor, index) => (
          <VendorCard key={uuid()} vendor={vendor} position={index + 1} />
        ))}
      </div>
    </div>
  );
}
export default TopRatedVendors;
