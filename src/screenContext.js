import { createContext, useContext } from "react";
import { useMediaQuery, useTheme } from "@mui/material";

const ScreenSizeContext = createContext();

export const ScreenSizeProvider = ({ children }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <ScreenSizeContext.Provider value={{ isSmallScreen }}>
      {children}
    </ScreenSizeContext.Provider>
  );
};

export const useScreenSize = () => {
  return useContext(ScreenSizeContext);
};
