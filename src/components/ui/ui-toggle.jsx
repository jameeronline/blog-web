import { Switch } from "@headlessui/react";
import { useDarkMode } from "../../context/darkmode-context";

export const UIToggle = () => {
  const { isDarkMode, setIsDarkMode } = useDarkMode();

  return (
    <Switch
      checked={isDarkMode}
      onChange={setIsDarkMode}
      className={`${
        isDarkMode ? "bg-primary-600" : "bg-gray-200"
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Enable Dark Mode</span>
      <span
        className={`${
          isDarkMode ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
};
