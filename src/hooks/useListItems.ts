import {useContext} from "react";
import {ListItemsChangeContext, ListItemsContext} from "../context/ListItemsContext";
import {ListItemsChangeContextValues, ListItemsContextValues} from "../types/contexts/ListItemsContextValues";

export const useListItems: () => [ListItemsContextValues, ListItemsChangeContextValues]
    = () => [useContext(ListItemsContext), useContext(ListItemsChangeContext)];