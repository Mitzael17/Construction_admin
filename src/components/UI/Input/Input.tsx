import React, {memo} from 'react';
import classes from './Input.module.scss';
import {InputProps} from "../../../types/components/UIComponents";
import {useTheme} from "../../../hooks/useTheme";
import {Themes} from "../../../types/contexts/Themes";

const Input = memo(({value, setValue, placeholder, type = 'text'}: InputProps) => {

    const [theme] = useTheme();

    return (
        <div className={classes.input_container}>
            <input
                value={value}
                onChange={(event) => setValue(event.target.value)}
                className={`${classes.input} ${theme === Themes.dark ? classes.dark : classes.light}`}
                type={type}
            />
            <div className={`${classes.placeholder} ${value ? classes.active_placeholder : ''}`}>{placeholder}</div>
        </div>
    );

});

export default Input;