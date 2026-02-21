import { createContext, useState } from "react";

export const mobileShopNow = createContext()

export const MobileShopProvider = ({children}) => {
  const [mobileShop, setMobileShop] = useState(0);
  return(<mobileShopNow.Provider value={{mobileShop, setMobileShop}}>{children}</mobileShopNow.Provider>)
}