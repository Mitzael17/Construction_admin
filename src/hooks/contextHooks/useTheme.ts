import {useContext} from "react";
import {Theme} from "../../types/contexts/Themes";
import {ThemeChangeContext, ThemeContext} from "../../context/ThemeContext";

export const useTheme = (): [Theme, (theme: Theme) => void] =>
    [useContext(ThemeContext), useContext(ThemeChangeContext)];