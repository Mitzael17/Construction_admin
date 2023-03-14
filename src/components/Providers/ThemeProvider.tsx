import React, {useState} from 'react';
import {themeChangeContext, themeContext} from '../../context/themeContext';
import {Theme, Themes} from "../../types/contexts/Themes";
import {getCookie, setCookie} from "../../utils/cookie";

const ThemeProvider = ({children}: {children: JSX.Element}) => {

    const [theme, setTheme] = useState<Theme>(getTheme());

    const setThemeFunction = (theme: Theme) => {

        setCookie('theme', theme, {
            "max-age": 100000000
        });

        setTheme(theme);

    }

    document.documentElement.dataset.theme = theme

    return (
        <themeContext.Provider value={theme}>
            <themeChangeContext.Provider value={setThemeFunction}>
                {children}
            </themeChangeContext.Provider>
        </themeContext.Provider>
    );

    function getTheme(): Theme {

        let theme = getCookie('theme');

        if(theme && (theme === Themes.dark || theme === Themes.light)) return theme;

        setCookie('theme', Themes.dark, {
            "max-age": 100000000
        });

        return Themes.dark;

    }
};

export default ThemeProvider;