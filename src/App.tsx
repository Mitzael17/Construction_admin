import React from 'react';
import {getCookie} from "./utils/cookie";
import AppRouter from "./components/AppRouter";
import Login from "./pages/Login/Login";
import {setRightVh} from "./utils/setRightVh";
import UserAndRoutesProvider from "./components/Providers/UserAndRoutesProvider";

const App = () => {

    setRightVh();

    const token = getCookie('token');

    return (
        <>
            { token !== undefined ? <UserAndRoutesProvider><AppRouter/></UserAndRoutesProvider> : <Login/>}
        </>
    );
};

export default App;