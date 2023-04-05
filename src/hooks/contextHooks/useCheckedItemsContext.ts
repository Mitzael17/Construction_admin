import {Dispatch, useContext} from "react";
import {CheckedItemsChangeContext, CheckedItemsContext} from "../../context/CheckedItemsContext";
import {CheckedItemsActions} from "../../types";

export const useCheckedItemsContext: () => [string[], Dispatch<CheckedItemsActions>]
    = () => [useContext(CheckedItemsContext), useContext(CheckedItemsChangeContext)];