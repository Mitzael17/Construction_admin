import React, {ForwardedRef, forwardRef} from 'react';
import classes from "./Input.module.scss";
import {InputProps} from "../../../types/components/UIComponents";

const TinyInput = forwardRef(({value, setValue, placeholder}: InputProps, ref?: ForwardedRef<HTMLInputElement>) => {
    return (
        <input ref={ref} className={classes.searchInput} placeholder={placeholder} type='text' value={value} onChange={(event) => setValue(event.target.value)} />
    );
});

export default TinyInput;