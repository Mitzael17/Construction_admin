import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavBar from "../layouts/NavBar";
import {routes} from "../data/routes";
import SideBar from "../layouts/SideBar";
import UserProvider from "./Providers/UserProvider";

const AppRouter = () => {
    return (

        <UserProvider>
            <BrowserRouter>
                <SideBar />
                <div className="page-content">
                <NavBar />
                <Routes>
                        {routes.map( (route) => {
                            return <Route key={route.path} path={route.path} element={route.element} />
                        })}
                </Routes>
                </div>

            </BrowserRouter>
        </UserProvider>

    );
};

export default AppRouter;