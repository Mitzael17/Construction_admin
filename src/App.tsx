import React, {useEffect} from 'react';
import {getCookie} from "./utils/cookie";
import AppRouter from "./components/AppRouter";
import Login from "./pages/Login/Login";
import UserAndRoutesProvider from "./components/Providers/UserAndRoutesProvider";
import ThemeProvider from "./components/Providers/ThemeProvider";

const App = () => {

    useEffect(() => {

        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        const resize = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
        };

    }, []);

    const token = getCookie('token');

    return (
        <ThemeProvider>
            { token !== undefined ? <UserAndRoutesProvider><AppRouter/></UserAndRoutesProvider> : <Login/>}
        </ThemeProvider>
    );
};

export default App;