import React, {memo, useRef, useState} from 'react';
import {SelectProps} from "../../../types/components/UIComponents";
import classes from "./Select.module.scss";
import ChevronDownIcon from "../../Icons/KalaiIcons/ChevronDownIcon";

const Select = memo(({items, setValue, value}: SelectProps) => {

    const [isShow, setIsShow] = useState(false);
    const listRef = useRef({} as HTMLDivElement);

    if(value) {
        items = items.filter( item => item.id !== value.id);
    }

    return (
        <div className={`${classes.container} ${isShow ?  classes.active: ''}`}>
            <div
                onClick={handleClick}
                className={classes.title}
            >
                {value.name} <ChevronDownIcon />
            </div>
            <div onTransitionEnd={handleTransitionEnd} ref={listRef} className={classes.wrapper}>
                <ul className={classes.list}>
                    {items.map( item => (
                        <li onClick={(event) => {

                            setValue(item);
                            handleClick(event);

                        }} className={classes.item} key={item.id}>
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

    function handleClick(event: React.MouseEvent<HTMLDivElement|HTMLLIElement>) {

        if(isShow) {

            setIsShow(false);
            listRef.current.style.height = listRef.current.offsetHeight + 'px';

            setTimeout(() => {
                listRef.current.style.height = '0px';
            }, 20);

        }
        else {

            setIsShow(true);
            listRef.current.style.height = listRef.current.scrollHeight + 'px';

        }

    }
    function handleTransitionEnd(event: React.TransitionEvent<HTMLDivElement>) {

        if(!isShow || event.propertyName !== 'height') return;

        listRef.current.style.height = 'auto';

    }

});

export default Select;