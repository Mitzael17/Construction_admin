import {useContext} from "react";
import {Theme} from "../types/contexts/Themes";
import {themeChangeContext, themeContext} from "../context/themeContext";

export const useTheme = (): [Theme, (theme: Theme) => void] =>
    [useContext(themeContext), useContext(themeChangeContext)];