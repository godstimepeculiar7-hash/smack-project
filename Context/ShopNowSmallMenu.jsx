import { createContext, useState } from "react";

export const ShopNowSmallMenu = createContext();

export const ShopNowSmallMenuProvider = ({children}) => {
  const [smallShopNow, setSmallShopNow] = useState(0);
  return (<ShopNowSmallMenu.Provider value={{smallShopNow, setSmallShopNow}}>{children}</ShopNowSmallMenu.Provider>);
}