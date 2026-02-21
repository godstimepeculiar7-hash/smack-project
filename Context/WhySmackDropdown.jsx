import { createContext } from "react";
import { useState } from "react";

export const whySmackDrop = createContext();

export const WhySmackProvider = ({children}) => {
  const [whySmack, setWhySmack] = useState(0);

  return(<whySmackDrop.Provider value={{whySmack, setWhySmack}}>{children}</whySmackDrop.Provider>);
};