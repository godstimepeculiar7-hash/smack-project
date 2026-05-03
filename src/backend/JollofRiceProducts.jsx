import { createContext, useState } from "react";
import riceProducts from '../My Products/Rice';

export const JollofRiceProductsContext = createContext()

export const JollofRiceProductsProvider = ({ children }) => {
  const [rice, setRice] = useState(riceProducts);

  // Products are loaded directly from Rice.js, no async needed

  return (
    <JollofRiceProductsContext.Provider value={{ rice, setRice }}>
      {children}
    </JollofRiceProductsContext.Provider>
  )
}