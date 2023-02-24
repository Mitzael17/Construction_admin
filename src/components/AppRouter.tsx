import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavBar from "../layouts/NavBar";
import {routes} from "../data/routes";
import SideBar from "../layouts/SideBar";

const AppRouter = () => {
    return (

        <BrowserRouter>
            <NavBar />
            <SideBar />
            <Routes>
                {routes.map( (route) => {
                    return <Route key={route.path} path={route.path} element={route.element} />
                })}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;