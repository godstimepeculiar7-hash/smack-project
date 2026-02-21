import { createContext, useState } from "react";

export const mobileBlog = createContext()

export const MobileBlogProvider = ({children}) => {
  const [blog, setBlog] = useState(0);
  return(<mobileBlog.Provider value={{blog, setBlog}}>{children}</mobileBlog.Provider>)
}