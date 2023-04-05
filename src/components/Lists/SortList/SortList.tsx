import React from 'react';
import {SortListProps} from "../../../types/components/ListsComponents";
import classes from "./SortList.module.scss";
const SortList = ({sorts, setCurrentSort, currentSort, isOpen}: SortListProps) => {

    return (
        <ul className={`${classes.list} ${isOpen ? classes.active : ''}`}>
            {sorts.map( sort => (
                <li className={`${classes.item} ${currentSort === sort ? classes.active : ''}`} onClick={() => {setCurrentSort(sort)}}>
                    {sort.substring(0, 1).toUpperCase() + sort.substring(1)}
                </li>
            ))}
        </ul>
    );

};

export default SortList;