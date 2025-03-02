import { createContext, useContext, useState } from "react";

// Define default config values
const defaultConfig = {
  fontStyle: "Inter", // default font
  primaryColor: "#007AFF", // default primary color
  theme: "light", // default theme
  showAuthor: false, // show author name
};

// Create the context
const ConfigContext = createContext();

// Provider component
export function ConfigProvider({ children }) {
  const [config, setConfig] = useState(defaultConfig);

  const updateConfig = (updates) => {
    setConfig((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const value = {
    ...config,
    updateConfig,
  };

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
}

// Custom hook for using the config context
export function useConfig() {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
}
