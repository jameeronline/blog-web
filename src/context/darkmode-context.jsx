import { useState, useContext, createContext } from "react";

const darkModeContext = createContext();

export const useDarkMode = () => {
  return useContext(darkModeContext);
};

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <darkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </darkModeContext.Provider>
  );
};
