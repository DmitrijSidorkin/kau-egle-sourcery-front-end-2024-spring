import { useContext, useEffect, useState } from 'react';
import {
  Meal,
  MenuAndVendorsContext,
  MenuAndVendorsContextType,
  Vendor,
} from '@/context/MenuAndVendorsContext';
import OrderHistoryTable from './OrderHistoryTable/OrderHistoryTable';

function OrderHistory() {
  const { setMeals, setVendors } = useContext<MenuAndVendorsContextType>(MenuAndVendorsContext);
  const [errors, setErrors] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = ['http://localhost:3002/meals', 'http://localhost:3002/vendors'];
        const responses = await Promise.all(urls.map((url) => fetch(url)));
        const results = await Promise.all(
          responses.map((res) => {
            if (!res.ok) throw new Error(`Error fetching data from ${res.url}`);
            return res.json();
          })
        );
        const [mealData, vendorData] = results;
        setMeals(
          mealData.map((meal: Meal) => ({
            ...meal,
            id: +meal.id,
            vendorId: +meal.vendorId,
          }))
        );
        setVendors(
          vendorData.map((vendor: Vendor) => ({
            ...vendor,
            id: +vendor.id,
          }))
        );
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrors(error.message);
        } else {
          setErrors('An unknown error occurred');
        }
      }
    };
    fetchData();
  }, [setMeals, setVendors]);

  return (
    <>
      {errors && <div>Error message: {errors}</div>}
      <OrderHistoryTable />
    </>
  );
}
export default OrderHistory;
