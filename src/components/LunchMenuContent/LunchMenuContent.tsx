import { useCallback, useContext, useEffect, useState } from 'react';
import { Vendor, Tab } from './types';
import LunchMenuTabs from './LunchMenuTabs/LunchMenuTabs';
import CardMenuList from './MenuCardList/MenuCardList';
import FoodSearchCard from './FoodSearchCard/FoodSearchCard';
import {
  Meal,
  MenuAndVendorsContext,
  MenuAndVendorsContextType,
} from '@/context/MenuAndVendorsContext';
import { LunchMenuContext, LunchMenuContextType } from '@/context/LunchMenuContext';
import { useAuth } from '@/context/AuthContext';
import setCurrentUserWeekOrders from '@/utils/setCurrentUserWeekOrders';
import { filterSearch as filterSearchUtil } from '../../utils/filterSearch';
import { DayNames } from '../CurrentWeekCards/Enum';
import styles from './LunchMenuContent.module.scss';
import * as jsonData from '@/../data/db.json';

function LunchMenuContent() {
  const { meals, setMeals, vendors, setVendors, setRatings } =
    useContext<MenuAndVendorsContextType>(MenuAndVendorsContext);
  const { currentTab, setCurrentTab } = useContext<LunchMenuContextType>(LunchMenuContext);
  // const [errors, setErrors] = useState<string | null>(null);
  const [selectedDropdownOption, setSelectedDropdownOption] = useState('');
  const [mealsToShow, setMealsToShow] = useState<Meal[]>(meals); // Initialize with all meals
  const { currentUserData, setOrderedThisWeek, setCurrentUserData, setItemsInCart } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const dayNames = Object.values(DayNames);
  const currentDay = new Date().getDay();

  useEffect(() => {
    const vendorData = jsonData.vendors;
    const changedVendorData: Vendor[] = vendorData.map((vendor) => ({
      ...vendor,
      id: +vendor.id,
    }));
    setVendors(changedVendorData);

    const mealData = jsonData.meals;
    const changedMealData: Meal[] = mealData.map((meal) => ({
      ...meal,
      id: +meal.id,
      vendorId: +meal.vendorId,
    }));
    setMeals(changedMealData);

    const ratingData = jsonData.ratings;
    setRatings(ratingData);
  }, [setMeals, setVendors, setRatings]);

  // Data fetching
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const vendorRes = await fetch('http://localhost:3002/vendors');
  //       if (!vendorRes.ok) {
  //         throw new Error('There was an error getting data from vendors, please try again later');
  //       }
  //       const vendorData: Vendor[] = await vendorRes.json();
  //       const changedVendorData: Vendor[] = vendorData.map((vendor) => ({
  //         ...vendor,
  //         id: +vendor.id,
  //       }));
  //       setVendors(changedVendorData);

  //       const mealRes = await fetch('http://localhost:3002/meals');
  //       if (!mealRes.ok) {
  //         throw new Error('There was an error getting data about meals, please try again later');
  //       }
  //       const mealData: Meal[] = await mealRes.json();
  //       const changedMealData: Meal[] = mealData.map((meal) => ({
  //         ...meal,
  //         id: +meal.id,
  //         vendorId: +meal.vendorId,
  //       }));
  //       setMeals(changedMealData);

  //       const ratingRes = await fetch('http://localhost:3002/ratings');
  //       if (!ratingRes.ok) {
  //         throw new Error('There was an error getting data about ratings, please try again later');
  //       }
  //       const ratingData = await ratingRes.json();
  //       setRatings(ratingData);
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         setErrors(error.message);
  //       }
  //     }
  //   };

  //   fetchData();
  // }, [setMeals, setVendors, setRatings]);

  useEffect(() => {
    setCurrentUserWeekOrders(currentUserData.userName, setOrderedThisWeek, setCurrentUserData);
  }, [currentUserData.userName, setOrderedThisWeek, setCurrentUserData]);
  // Filter meals by tabs and optionally by vendor
  const filterSearch = useCallback(
    (tab: Tab) => {
      filterSearchUtil({
        tab,
        meals,
        vendors,
        selectedDropdownOption,
        searchTerm,
        setCurrentTab,
        setMealsToShow,
      });
    },
    [setCurrentTab, meals, selectedDropdownOption, searchTerm, vendors]
  );
  useEffect(() => {
    filterSearch({ value: currentTab });
  }, [currentTab, meals, vendors, selectedDropdownOption, searchTerm, filterSearch]);

  // Filter meals by vendors
  const handleDropdownChange = (event: HTMLButtonElement) => {
    const selectedVendorName = event.value;
    setSelectedDropdownOption(selectedVendorName);
    // filterSearch({ value: currentTab });
  };

  useEffect(() => {
    if (currentUserData.orders) {
      setItemsInCart(
        currentUserData.orders.reduce((acc, day) => acc + (day.mealIds?.length || 0), 0)
      );
    }
  });

  useEffect(() => {
    filterSearch({ value: currentTab });
  }, [currentTab, meals, vendors, selectedDropdownOption, searchTerm, filterSearch]);

  return (
    <div className={styles['lunch-menu-content']}>
      <LunchMenuTabs
        filterSearch={(tab) => filterSearch(tab)}
        dayNames={dayNames}
        currentDay={currentDay}
      />
      <FoodSearchCard
        handleDropdownChange={handleDropdownChange}
        vendorNames={vendors.map((vendor) => vendor.name)}
        selectedDropdownOption={selectedDropdownOption}
        setSearchTerm={setSearchTerm}
        meals={mealsToShow}
        setMeals={setMealsToShow}
      />
      <CardMenuList meals={mealsToShow} vendors={vendors} errors={null} />
    </div>
  );
}

export default LunchMenuContent;
