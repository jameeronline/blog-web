import { Switch } from "@headlessui/react";
import { useConfig } from "../../context/config-context";

export const UIToggle = () => {
  const { theme, updateConfig } = useConfig();

  const isDark = theme === "dark" ? true : false;

  return (
    <Switch
      checked={isDark}
      onChange={() => updateConfig({ theme: isDark ? "light" : "dark" })}
      className={`${
        isDark ? "bg-primary-600" : "bg-gray-200"
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Enable Dark Mode</span>
      <span
        className={`${
          isDark ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
};
