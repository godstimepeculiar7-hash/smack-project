import { createContext, useEffect, useState } from "react";
import { getSwallow } from "./firebase.utils";

export const SwallowProductContext = createContext()

export const SwallowProductContextProvider = ({ children }) => {
  const [swallow, setSwallow] = useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getSwallow();
      setSwallow(data);
      console.log(swallow);
      console.log(Array.isArray(data))

    }

    fetchProducts();
  }, [])

  return (<SwallowProductContext.Provider value={{ swallow, setSwallow }}>{children}</SwallowProductContext.Provider>)
}