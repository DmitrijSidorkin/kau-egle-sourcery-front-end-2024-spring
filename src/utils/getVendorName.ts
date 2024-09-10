import { Meal, Vendor } from '@/context/MenuAndVendorsContext';

export function getVendorName(vendors: Vendor[], dish: Meal | undefined): string {
  return dish ? vendors.find((vendor) => vendor.id === dish.vendorId)?.name || '-' : '-';
}
