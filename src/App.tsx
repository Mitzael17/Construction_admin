import React from 'react';
import {getCookie} from "./utils/cookie";
import AppRouter from "./components/AppRouter";
import Login from "./pages/Login/Login";
import {setRightVh} from "./utils/setRightVh";
import UserAndRoutesProvider from "./components/Providers/UserAndRoutesProvider";
import ThemeProvider from "./components/Providers/ThemeProvider";

const App = () => {

    setRightVh();

    const token = getCookie('token');

    return (
        <ThemeProvider>
            { token !== undefined ? <UserAndRoutesProvider><AppRouter/></UserAndRoutesProvider> : <Login/>}
        </ThemeProvider>
    );
};

export default App;