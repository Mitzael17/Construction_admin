import {useLazyLoading} from "../../hooks/useLazyLoading";
import {ListItem} from "./ListsComponents";

export interface ListItemsProviderProps {

    limitLoadingItems: number,
    callback: Parameters<typeof useLazyLoading<ListItem>>[2],
    children: JSX.Element

}