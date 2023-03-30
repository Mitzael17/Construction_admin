import {createContext, Dispatch} from "react";
import {CheckedItemsActions} from "../types";

export const CheckedItemsContext = createContext<string[]>([]);

export const CheckedItemsChangeContext = createContext(function () {} as Dispatch<CheckedItemsActions>);