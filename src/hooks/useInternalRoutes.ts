import {useContext} from "react";
import {RoutesContext} from "../context/RoutesContext";

export const useInternalRoutes = () => useContext(RoutesContext);