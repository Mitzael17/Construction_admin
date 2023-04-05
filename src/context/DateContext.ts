import {createContext} from "react";
import {DateChangeContextValues, DateContextValues} from "../types/contexts/DateContextValues";

export const DateContext = createContext({} as DateContextValues);

export const DateChangeContext = createContext({} as DateChangeContextValues);