import {createContext} from "react";
import {Theme, Themes} from "../types/contexts/Themes";

export const ThemeContext = createContext<Theme>(Themes.dark);

export const ThemeChangeContext = createContext(((theme: Theme) => {}) as (theme: Theme) => void)