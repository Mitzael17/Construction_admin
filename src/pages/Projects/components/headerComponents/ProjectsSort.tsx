import React, {memo, useRef} from 'react';
import SortIcon from "../../../../components/Icons/KalaiIcons/SortIcon";
import {useOutClick} from "../../../../hooks/useOutClick";
import {useSortProjects} from "../../hooks/useSortProjects";

const ProjectsSort = memo(() => {

    const sortListRef = useRef<HTMLDivElement>(null);
    const [showSortList, setShowSortList] = useOutClick(sortListRef);

    // Context values
    const [sort, setSort] = useSortProjects();

    return (
        <div
            className='kalaiIcon--box'
            ref={sortListRef}
            onClick={() => {
                setShowSortList(prev => !prev);
            }}>
            <SortIcon />
            <ul className={`list ${showSortList ? 'active' : ''}`}>
                <li className={`list__item ${sort === 'newest' ? 'active' : ''}`} onClick={() => {setSort('newest')}}>Newest</li>
                <li className={`list__item ${sort === 'oldest' ? 'active' : ''}`} onClick={() => {setSort('oldest')}}>Oldest</li>
            </ul>
        </div>
    );

});

export default ProjectsSort;