import React, {memo} from 'react';
import {SelectProps} from "../../../types/components/UIComponents";
import classes from "./Select.module.scss";
import ChevronDownIcon from "../../Icons/KalaiIcons/ChevronDownIcon";
import {useHeightTransition} from "../../../hooks/useHeightTransition";

const Select = memo(({items, setValue, value}: SelectProps) => {

    const [isOpen, setIsOpen, listRef] = useHeightTransition();

    if(value) {
        items = items.filter( item => item.id !== value.id);
    }

    return (
        <div className={`${classes.container} ${isOpen ?  classes.active: ''}`}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={classes.title}
            >
                {value.name} <ChevronDownIcon />
            </div>
            <div ref={listRef}>
                <ul className={classes.list}>
                    {items.map( item => (
                        <li onClick={ () => {

                            setValue(item);
                            setIsOpen(!isOpen);

                        }} className={classes.item} key={item.id}>
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );


});

export default Select;