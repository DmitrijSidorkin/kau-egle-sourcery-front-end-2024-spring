import { useEffect, useState, useContext } from 'react';
import {
  Vendor,
  Meal,
  MenuAndVendorsContext,
  MenuAndVendorsContextType,
} from '@/context/MenuAndVendorsContext';
import AvailableFoodTable from './AvailableFoodTable/AvailableFoodTable';
import { UserData, useAuth } from '@/context/AuthContext';
import ReservedMealCard from './ReservedMealCard/ReservedMealCard';
import * as jsonData from '@/../data/db.json';

function AvailableFood(): JSX.Element {
  const { setMeals, setVendors } = useContext<MenuAndVendorsContextType>(MenuAndVendorsContext);
  const [users, setUsers] = useState<UserData[]>([]);
  // const [errors, setErrors] = useState<string | null>(null);
  const [reserved, setReserved] = useState(false);
  const { availableLunch, setAvailableLunch } = useAuth();

  useEffect(() => {
    const fetchData = () => {
      const existingAvailableLunch = JSON.parse(localStorage.getItem('availableLunch') as string);
      const availableLunchData = jsonData.availableLunch;
      const vendorData = jsonData.vendors;
      const mealData = jsonData.meals;
      const userData = jsonData.users;

      if (!existingAvailableLunch || existingAvailableLunch.length === 0) {
        setAvailableLunch(availableLunchData);
        localStorage.setItem('availableLunch', JSON.stringify(availableLunch));
      } else {
        setAvailableLunch(existingAvailableLunch);
      }

      setVendors(
        vendorData.map((vendor: Vendor) => ({
          ...vendor,
          id: +vendor.id,
        }))
      );

      setMeals(
        mealData.map((meal: Meal) => ({
          ...meal,
          id: +meal.id,
          vendorId: +meal.vendorId,
        }))
      );

      setUsers(
        userData.map((user: UserData) => ({
          ...user,
          id: +user.id!,
          orders: [{}],
        }))
      );
    };

    fetchData();
  }, [availableLunch, setAvailableLunch, setMeals, setVendors]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const urls = [
  //         'http://localhost:3002/availableLunch',
  //         'http://localhost:3002/vendors',
  //         'http://localhost:3002/meals',
  //         'http://localhost:3002/users',
  //       ];
  //       const responses = await Promise.all(urls.map((url) => fetch(url)));

  //       const results = await Promise.all(
  //         responses.map((res) => {
  //           if (!res.ok) throw new Error(`Error fetching data from ${res.url}`);
  //           return res.json();
  //         })
  //       );
  //       const existingAvailableLunch = JSON.parse(localStorage.getItem('availableLunch') as string);
  //       const [availableLunchData, vendorData, mealData, userData] = results;

  //       if (!existingAvailableLunch || existingAvailableLunch.length === 0) {
  //         setAvailableLunch(
  //           availableLunchData.map((lunch: AvailableLunch) => ({
  //             ...lunch,
  //             id: lunch.id,
  //           }))
  //         );
  //         localStorage.setItem('availableLunch', JSON.stringify(availableLunch));
  //       } else {
  //         setAvailableLunch(existingAvailableLunch);
  //       }

  //       setVendors(
  //         vendorData.map((vendor: Vendor) => ({
  //           ...vendor,
  //           id: +vendor.id,
  //         }))
  //       );

  //       setMeals(
  //         mealData.map((meal: Meal) => ({
  //           ...meal,
  //           id: +meal.id,
  //           vendorId: +meal.vendorId,
  //         }))
  //       );

  //       setUsers(
  //         userData.map((user: UserData) => ({
  //           ...user,
  //           id: +user.id!,
  //           orders: [{}],
  //         }))
  //       );
  //     } catch (error: unknown) {
  //       if (error instanceof Error) {
  //         setErrors(error.message);
  //       } else {
  //         setErrors('An unknown error occurred');
  //       }
  //     }
  //   };

  //   fetchData();
  // }, [availableLunch, setAvailableLunch, setMeals, setVendors]);

  return (
    <>
      {/* {errors && <div>Error message: {errors}</div>} */}
      {reserved ? (
        <ReservedMealCard setReserved={setReserved} />
      ) : (
        <AvailableFoodTable
          fetchedUsers={users}
          availableLunch={availableLunch}
          setReserved={setReserved}
        />
      )}
    </>
  );
}

export default AvailableFood;
