import React, {memo} from 'react';
import {ButtonProps} from "../../../types/components/UIComponents";
import classes from "./Button.module.scss";
import {Themes} from "../../../types/contexts/Themes";

const TinyButton = memo(({children, type = 'button', theme = 'dark', ...props}: ButtonProps) => {

    return (
        <button
            type={type}
            className={`${classes[theme]} ${classes.button} ${classes.tiny} ${theme === Themes.dark ? classes.dark : classes.light}`}
            {...props}
        >
            <span>{children}</span>
        </button>
    );
});

export default TinyButton;