import {createContext} from "react";
import {OwnUserAccount} from "../types/API/usersAPI";


export const userContext = createContext({} as OwnUserAccount);
export const userChangeContext = createContext(function changeContext(data: OwnUserAccount){});