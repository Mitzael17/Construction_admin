import {Dispatch, useContext} from "react";
import {CheckedItemsChangeContext, CheckedItemsContext} from "../../context/CheckedItemsContext";
import {CheckedItemsActions} from "../../types";

export const useCheckedItems: () => [string[], Dispatch<CheckedItemsActions>]
    = () => [useContext(CheckedItemsContext), useContext(CheckedItemsChangeContext)];