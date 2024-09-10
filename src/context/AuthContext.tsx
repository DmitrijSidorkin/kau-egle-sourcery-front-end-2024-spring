import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useMemo,
  Dispatch,
  SetStateAction,
} from 'react';

export interface Orders {
  weekDay?: string;
  mealIds?: number[];
}
export interface OrderHistory {
  date: string;
  mealsIds: number[];
}

export interface CurrentWeekDayOrder {
  day: string;
  orders: number[];
}
export interface ConfirmedOrders {
  day: string;
  orders: number[];
}

export interface AvailableLunch {
  id: string;
  username?: string;
  userId?: number;
  mealIds: number[];
}

export interface UserData {
  userName?: string;
  password?: string;
  email?: string;
  name?: string;
  surname?: string;
  balance?: number;
  img?: string;
  orders: Orders[];
  orderHistory?: OrderHistory[];
  id?: number;
}

interface IAuthContext {
  isAuthenticated: boolean;
  setIsAuthenticated: (newState: boolean) => void;
  currentUserData: UserData;
  setCurrentUserData: Dispatch<SetStateAction<UserData> | UserData>;
  itemsInCart: number;
  setItemsInCart: Dispatch<SetStateAction<number>>;
  orderedThisWeek: CurrentWeekDayOrder[];
  setOrderedThisWeek: Dispatch<SetStateAction<CurrentWeekDayOrder[]>>;
  confirmedOrdersArray: ConfirmedOrders[];
  setConfirmedOrdersArray: Dispatch<SetStateAction<ConfirmedOrders[]>>;
  availableLunch: AvailableLunch[];
  setAvailableLunch: Dispatch<SetStateAction<AvailableLunch[]>>;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUserData, setCurrentUserData] = useState({ orders: [{}] });
  const [itemsInCart, setItemsInCart] = useState(0);
  const [orderedThisWeek, setOrderedThisWeek] = useState<CurrentWeekDayOrder[]>([]);
  const [confirmedOrdersArray, setConfirmedOrdersArray] = useState<ConfirmedOrders[]>([]);
  const [availableLunch, setAvailableLunch] = useState<AvailableLunch[]>([]);

  const authValue = useMemo(
    () => ({
      isAuthenticated,
      setIsAuthenticated,
      currentUserData,
      setCurrentUserData,
      itemsInCart,
      setItemsInCart,
      orderedThisWeek,
      setOrderedThisWeek,
      confirmedOrdersArray,
      setConfirmedOrdersArray,
      availableLunch,
      setAvailableLunch,
    }),
    [
      isAuthenticated,
      currentUserData,
      itemsInCart,
      orderedThisWeek,
      confirmedOrdersArray,
      availableLunch,
    ]
  );

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}

export { AuthProvider };
