import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import { Root } from './Root/Root';
import { FoodMenu } from '@/routes/FoodMenu/FoodMenu';
import { AvailableLunch } from '@/routes/AvailableLunch/AvailableLunch';
import { Ratings } from '@/routes/Ratings/Ratings';
import { YourOrders } from '@/routes/YourOrders/YourOrders';
import { Login } from '@/routes/Login/Login';
import { AuthProvider } from '@/context/AuthContext';
import countWorkdays from '@/utils/countWorkdays';

const { startDay, endDay } = countWorkdays();

const routeTitle = {
  '/': '',
  '/food-menu': 'Lunch Menu',
  '/available-lunch': 'Available Lunch',
  '/ratings': 'Ratings',
  '/your-orders': 'Your Orders',
};

const routeSubtitle = {
  '/': () => '',
  '/food-menu': () => `Lunch menu for the week of ${startDay} - ${endDay}`,
  '/available-lunch': () => 'Friday dishes that are up for grabs, from your colleagues.',
  '/ratings': () => `Week of ${startDay} - ${endDay}`,
  '/your-orders': () => `Week ${startDay} - ${endDay}`,
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root routeTitle={routeTitle} routeSubtitle={routeSubtitle} />}>
        <Route path="food-menu" element={<FoodMenu />} />
        <Route path="available-lunch" element={<AvailableLunch />} />
        <Route path="ratings" element={<Ratings />} />
        <Route path="your-orders" element={<YourOrders />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </>
  )
);

function AppRouter() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default AppRouter;
