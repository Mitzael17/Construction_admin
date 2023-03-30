import {createContext} from "react";
import {FiltersProjectsChangeContextValues, FiltersProjectsContextValues} from "../types";

export const FiltersProjectsContext = createContext({} as FiltersProjectsContextValues);

export const FiltersProjectsChangeContext = createContext({} as FiltersProjectsChangeContextValues);