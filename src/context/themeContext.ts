import {createContext} from "react";
import {Theme, Themes} from "../types/contexts/Themes";

export const themeContext = createContext<Theme>(Themes.dark);

export const themeChangeContext = createContext(((theme: Theme) => {}) as (theme: Theme) => void)