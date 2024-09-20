import { useContext, useEffect } from 'react';
import TopRatedDishesTable from './TopRatedDishesTable/TopRatedDishesTable';
import {
  MenuAndVendorsContext,
  MenuAndVendorsContextType,
  Vendor,
  Meal,
} from '@/context/MenuAndVendorsContext';
import * as jsonData from '@/../data/db.json';

function TopRatedDishes(): JSX.Element {
  const { setMeals, setRatings, setVendors } =
    useContext<MenuAndVendorsContextType>(MenuAndVendorsContext);
  // const [errors, setErrors] = useState<string | null>(null);

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

  return (
    <>
      {/* {errors && <div>Error message: {errors}</div>} */}
      <TopRatedDishesTable />
    </>
  );
}

export default TopRatedDishes;
