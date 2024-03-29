import React, {ForwardedRef, forwardRef} from 'react';
import classes from "./Input.module.scss";
import {InputProps} from "../../../types/components/UIComponents";
import {useThemeContext} from "../../../hooks/contextHooks/useThemeContext";
import {Themes} from "../../../types/contexts/Themes";

const TinyInput = forwardRef(({value, setValue, placeholder}: InputProps, ref?: ForwardedRef<HTMLInputElement>) => {

    const [theme] = useThemeContext();

    return (
        <input
            ref={ref}
            className={`${classes.searchInput} ${theme === Themes.dark ? classes.dark : classes.light}`}
            placeholder={placeholder} 
            type='text'
            value={value}
            onChange={(event) => setValue(event.target.value)}
        />
    );
});

export default TinyInput;