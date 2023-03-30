import {ListItem} from "../components/ListsComponents";
import {Dispatch, RefObject, SetStateAction} from "react";

export interface ListItemsContextValues {

    readonly items: ListItem[],
    readonly isLoading: boolean,
    readonly isOver: boolean,
    nodeRef: RefObject<HTMLDivElement>

}

export interface ListItemsChangeContextValues {

    readonly setItems: Dispatch<SetStateAction<ListItem[]>>,
    readonly resetItems: () => void

}