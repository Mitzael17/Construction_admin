import {createContext} from "react";
import {RouteResponse} from "../types/API/routes";

export const routesContext = createContext<RouteResponse>({} as RouteResponse);