import React, {useRef} from 'react';
import {ListItemsChangeContext, ListItemsContext } from '../../context/ListItemsContext';
import {useLazyLoading} from "../../hooks/useLazyLoading";
import {ListItem} from "../../types/components/ListsComponents";
import {ListItemsProviderProps} from "../../types/components/ProvidersComponents";

const ListItemsProvider = ({limitLoadingItems, callback, children}: ListItemsProviderProps) => {

    // The nodeRef is essential for lazy loading.
    // A block, which has the ref, will cause a lazy Loading, when we scroll to it.
    const nodeRef = useRef<HTMLDivElement>(null);

    const [items, setItems, isLoading, isOver, resetItems] = useLazyLoading<ListItem>(nodeRef, limitLoadingItems, callback);

    return (
        <ListItemsContext.Provider value={{ items, isLoading, isOver, nodeRef }}>
            <ListItemsChangeContext.Provider value={{ setItems, resetItems }}>
                {children}
            </ListItemsChangeContext.Provider>
        </ListItemsContext.Provider>
    );
};

export default ListItemsProvider;