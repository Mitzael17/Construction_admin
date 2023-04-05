import React, {memo, useRef} from 'react';
import {useSortContext} from "../../../../hooks/contextHooks/useSortContext";
import {useOutClick} from "../../../../hooks/useOutClick";
import SortIcon from "../../../../components/Icons/KalaiIcons/SortIcon";
import SortList from "../../../../components/Lists/SortList/SortList";
import {DefaultSorts} from "../../../../types/contexts/SortContext";

const LogsSort = memo(() => {

    const sortListRef = useRef<HTMLDivElement>(null);
    const [showSortList, setShowSortList] = useOutClick(sortListRef);

    // Context values
    const [sort, setSort] = useSortContext();

    return (
        <div
            className='kalaiIcon--box'
            ref={sortListRef}
            onClick={() => {
                setShowSortList(prev => !prev);
            }}>
            <SortIcon />
            <SortList
                currentSort={sort}
                setCurrentSort={setSort}
                sorts={Object.values(DefaultSorts)}
                isOpen={showSortList}
            />
        </div>
    );

});

export default LogsSort;