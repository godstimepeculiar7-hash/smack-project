import { createContext, useEffect, useState } from "react";
import { getProducts } from "./firebase.utils";

export const JollofRiceProductsContext = createContext()

export const JollofRiceProductsProvider = ({ children }) => {
  const [rice, setRice] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setRice(data);
      console.log(rice)
      console.log(Array.isArray(data));
    }

    fetchProducts();
  }, [])

  return (
    <JollofRiceProductsContext.Provider value={{ rice, setRice }}>
      {children}
    </JollofRiceProductsContext.Provider>
  )
}