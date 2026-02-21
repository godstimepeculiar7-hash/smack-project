import { createContext, useState } from "react";

export const whySmack = createContext()

export const WhySmackMobileProvider = ({children}) => {
  const [why, setWhy] = useState(0);

  return(<whySmack.Provider value={{why, setWhy}}>{children}</whySmack.Provider>);
}