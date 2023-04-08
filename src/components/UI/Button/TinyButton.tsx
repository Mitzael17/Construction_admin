import React, {ButtonHTMLAttributes, memo} from 'react';
import classes from "./Button.module.scss";
import {useThemeContext} from "../../../hooks/contextHooks/useThemeContext";
import {Themes} from "../../../types/contexts/Themes";

const TinyButton = memo(({children, type = 'button', ...props}: Omit<ButtonHTMLAttributes<any>, 'className'>) => {

    const [theme] = useThemeContext();

    return (
        <button
            type={type}
            className={`${classes.button} ${classes.tiny} ${theme === Themes.dark ? classes.dark : classes.light}`}
            {...props}
        >
            <span>{children}</span>
        </button>
    );
});

export default TinyButton;