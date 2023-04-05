import React, {memo} from 'react';
import {useListItemsContext} from "../../../hooks/contextHooks/useListItemsContext";
import Loading from "../../../components/Visual/Loading";
import ItemsList from "../../../components/Lists/ItemsList/ItemsList";

const LogsContent = memo(() => {

    const [{items, nodeRef, isOver, isLoading}] = useListItemsContext();

    return (
        <div className='main__content'>
            <ItemsList items={items} />
            <div ref={nodeRef}></div>
            {isOver && <div className='endLine'></div>}
            {isLoading && <div className='mt-20px center-x'><Loading /></div>}
        </div>
    );

});

export default LogsContent;