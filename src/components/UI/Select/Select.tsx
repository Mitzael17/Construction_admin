import React, {memo} from 'react';
import {SelectProps} from "../../../types/components/UIComponents";
import classes from "./Select.module.scss";
import ChevronDownIcon from "../../Icons/KalaiIcons/ChevronDownIcon";
import {useHeightTransition} from "../../../hooks/useHeightTransition";
import Loading from "../../Visual/Loading";

const Select = memo(({items, setValue, value, isLoading, label}: SelectProps) => {

    const [isOpen, setIsOpen, listRef] = useHeightTransition();

    if(value) {
        items = items.filter( item => item.id !== value.id);
    }

    return (
        <div className='flex'>
            {label && <div className='min-w-30 mr-15px mt-15px label' onClick={ () => setIsOpen(prev => !prev)}>{label}</div>}
            <div className={`${classes.container} ${isOpen ?  classes.active: ''} w-100`}>
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className={classes.title}
                >
                    {value.name} <ChevronDownIcon />
                </div>
                <div ref={listRef}>
                    {isLoading ? <div className='mt-20px mb-20px ml-20px mr-20px'><Loading /></div> : (
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
                    )}
                </div>
            </div>
        </div>
    );


});

export default Select;