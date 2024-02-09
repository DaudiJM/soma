import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";

import React, {createContext, useEffect, useMemo} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { createTheme } from "../theme";
import useToggle from "../hooks/use-toggle";

interface SettingsContextInterface {
  collapsed: boolean;
  direction: string;
  mode: string;
  openDrawer: boolean;
  openSettings: boolean;
  changeCollapsed: (collapsed: boolean) => void;
  changeMode: (mode: string) => void;
  toggleDrawer: () => void;
  toggleSettings: () => void;
  changeDirection: (direction: "ltr" | "rtl") => void;
}

export const SettingsContext = createContext({} as SettingsContextInterface);

type SettingsProviderProps = {
  children: React.ReactNode;
};

const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [collapsed, setCollapsed] = useLocalStorage("sidebarcollapsed", false);
  const [mode, setMode] = useLocalStorage("mode", "light");
  const [direction, setDirection] = useLocalStorage("direction", "ltr");
  const [openSettings, toggleSettings] = useToggle();
  const [openDrawer, toggleDrawer] = useToggle();


  useEffect(() => {
    document.body.dir = direction;
  }, [direction]);

  const theme = useMemo(
    () => createTheme(direction as "ltr" | "rtl", mode as "dark" | "light"),
    [direction, mode]
  );

  const changeCollapsed = (collapsed: boolean) => {
    if (typeof collapsed === "boolean") {
      setCollapsed(collapsed);
    }
  };

  const changeDirection = (direction: "ltr" | "rtl") => {
    if (direction) {
      setDirection(direction);
    }
  };

  const changeMode = (mode: string) => {
    if (mode) {
      setMode(mode);
    }
  };


  return (
    <SettingsContext.Provider
      value={{
        collapsed,
        direction,
        mode,
        openSettings,
        changeCollapsed,
        changeDirection,
        changeMode,
        toggleSettings,
        openDrawer,
        toggleDrawer
      }}
    >
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
          {children}
      </MuiThemeProvider>
    </SettingsContext.Provider>
  );
};



export default SettingsProvider;
