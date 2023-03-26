import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "../layouts/Navbar";
import {routes as allRoutes} from "../data/routes";
import Sidebar from "../layouts/Sidebar";
import {useInternalRoutes} from "../hooks/useInternalRoutes";

const AppRouter = () => {

    const availableRoutes = useInternalRoutes().routes;
    const routes = allRoutes.filter( route => availableRoutes.indexOf(route.name_path) !== -1);

    return (
            <BrowserRouter>
                <Sidebar />
                <div className="page-content">
                <Navbar />
                <Routes>
                        {routes.map( (route) => {
                            return <Route key={route.path} path={route.path} element={route.element} />
                        })}
                </Routes>
                </div>
            </BrowserRouter>
    );
};

export default AppRouter;