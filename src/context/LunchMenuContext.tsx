import { ReactNode, createContext, useMemo, useState } from 'react';
import setDayTabName from '@/utils/setDayTabName';

interface Orders {
  weekDay?: string;
  mealIds?: number[];
}

export interface LunchMenuContextType {
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
  userOrder: Orders[];
  setUserOrder: React.Dispatch<React.SetStateAction<Orders[]>>;
  isCartEmpty: boolean;
  setIsCartEmpty: React.Dispatch<React.SetStateAction<boolean>>;
  isCheckoutConfirmed: boolean;
  setIsCheckoutConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LunchMenuContext = createContext<LunchMenuContextType>({
  currentTab: '',
  setCurrentTab: () => {},
  userOrder: [],
  setUserOrder: () => {},
  isCartEmpty: true,
  setIsCartEmpty: () => {},
  isCheckoutConfirmed: false,
  setIsCheckoutConfirmed: () => {},
});

export function LunchMenuContextProvider({ children }: { children: ReactNode }) {
  const [currentTab, setCurrentTab] = useState<string>(setDayTabName());
  const [userOrder, setUserOrder] = useState<Orders[]>([]);
  const [isCartEmpty, setIsCartEmpty] = useState<boolean>(true);
  const [isCheckoutConfirmed, setIsCheckoutConfirmed] = useState(false);

  const contextValue = useMemo(
    () => ({
      currentTab,
      setCurrentTab,
      userOrder,
      setUserOrder,
      isCartEmpty,
      setIsCartEmpty,
      isCheckoutConfirmed,
      setIsCheckoutConfirmed,
    }),
    [
      currentTab,
      setCurrentTab,
      userOrder,
      setUserOrder,
      isCartEmpty,
      setIsCartEmpty,
      isCheckoutConfirmed,
      setIsCheckoutConfirmed,
    ]
  );

  return <LunchMenuContext.Provider value={contextValue}>{children}</LunchMenuContext.Provider>;
}
