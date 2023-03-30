import {createContext} from "react";
import {ListItemsChangeContextValues, ListItemsContextValues} from "../types/contexts/ListItemsContextValues";

export const ListItemsContext = createContext({} as ListItemsContextValues);
export const ListItemsChangeContext = createContext({} as ListItemsChangeContextValues);