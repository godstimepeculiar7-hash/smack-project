import { createContext } from "react";
import { useState } from "react";

export const blogDrop = createContext();

export const BlogDropProvider = ({children}) => {
  const [blog, setBlog] = useState(0);

  return(<blogDrop.Provider value={{blog, setBlog}}>{children}</blogDrop.Provider>)
}