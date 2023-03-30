import {createContext} from "react";
import {RouteResponse} from "../types/API/routes";

export const RoutesContext = createContext<RouteResponse>({} as RouteResponse);