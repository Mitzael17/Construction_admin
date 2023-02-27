import React from 'react';
import classes from "./Input.module.scss";
import {InputProps} from "../../../types/components/UIComponents";

const TinyInput = ({value, setValue, placeholder}: InputProps) => {
    return (
        <input className={classes.searchInput} placeholder={placeholder} type='text' value={value} onChange={(event) => setValue(event.target.value)} />
    );
};

export default TinyInput;