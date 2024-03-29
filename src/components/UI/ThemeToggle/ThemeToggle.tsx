import React from 'react';
import {useThemeContext} from "../../../hooks/contextHooks/useThemeContext";
import {Themes} from "../../../types/contexts/Themes";
import classes from "./ThemeToggle.module.scss";

const ThemeToggle = () => {

    const [theme, setTheme] = useThemeContext();

    const themeClass = theme === Themes.dark ? 'dark' : 'light';

    return (
        <div onClick={() => {setTheme(getNextTheme())}} className={`${classes.container} ${classes[themeClass]}`}>
            <div className={`${classes.item} ${classes[themeClass]}`}></div>
        </div>
    );

    function getNextTheme() {

        if(theme === Themes.dark) return Themes.light;
        else return Themes.dark;

    }

};

export default ThemeToggle;