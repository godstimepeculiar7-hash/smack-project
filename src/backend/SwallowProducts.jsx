import { createContext, useState } from "react";
import swallow from '../My Products/Swallow';

export const SwallowProductContext = createContext()

export const SwallowProductContextProvider = ({ children }) => {
  const [swallowProducts, setSwallowProducts] = useState(swallow)

  return (<SwallowProductContext.Provider value={{ swallow: swallowProducts, setSwallow: setSwallowProducts }}>{children}</SwallowProductContext.Provider>)
}