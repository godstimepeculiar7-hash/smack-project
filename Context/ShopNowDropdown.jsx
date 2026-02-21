import { createContext } from "react";
import { useState } from "react";

export const shopNow = createContext()

export const ShopNowProvider = ({children}) => {
  const [shop, setShop] = useState(0);

  return (<shopNow.Provider value={{shop, setShop}}>{children}</shopNow.Provider>);
};