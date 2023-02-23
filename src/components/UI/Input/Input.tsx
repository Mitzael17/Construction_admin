import React, {useState} from 'react';
import classes from './Input.module.scss';
import {InputProps} from "../../../types/UIComponents";
const Input = ({value, setValue, placeholder, ...props}: InputProps) => {

    return (
        <div className={classes.input_container}>
            <input value={value} onChange={(event) => setValue(event.target.value)} className={classes.input} type="text" {...props} />
            <div className={`${classes.placeholder} ${value ? classes.active_placeholder : ''}`}>{placeholder}</div>
        </div>
    );

}

export default Input;