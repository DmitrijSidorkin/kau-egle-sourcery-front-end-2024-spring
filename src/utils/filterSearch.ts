// filterUtils.ts
import { Tab, Vendor } from '@/components/LunchMenuContent/types';
import { Meal } from '@/context/MenuAndVendorsContext';

type FilterSearchParams = {
  tab: Tab;
  meals: Meal[];
  vendors: Vendor[];
  selectedDropdownOption: string;
  searchTerm: string;
  setCurrentTab: (value: string) => void;
  setMealsToShow: (meals: Meal[]) => void;
};

export const filterSearch = ({
  tab,
  meals,
  vendors,
  selectedDropdownOption,
  searchTerm,
  setCurrentTab,
  setMealsToShow,
}: FilterSearchParams) => {
  setCurrentTab(tab.value);
  let filteredMeals = meals.filter((meal) => meal.weekDays.includes(tab.value));

  // If a vendor is selected, filter meals by vendor
  if (selectedDropdownOption) {
    const selectedVendor = vendors.find((vendor) => vendor.name === selectedDropdownOption);
    if (selectedVendor) {
      filteredMeals = filteredMeals.filter((meal) => meal.vendorId === Number(selectedVendor.id));
    }
  }

  // Filter by search term
  if (searchTerm) {
    filteredMeals = filteredMeals.filter((meal) =>
      meal.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  setMealsToShow(filteredMeals);
};

export default filterSearch;
