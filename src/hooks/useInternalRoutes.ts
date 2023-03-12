import {useContext} from "react";
import {routesContext} from "../context/routesContext";

export const useInternalRoutes = () => useContext(routesContext);