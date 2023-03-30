import {createContext, Dispatch, SetStateAction} from "react";
import {OwnUserAccount} from "../types/API/usersAPI";


export const UserContext = createContext({} as OwnUserAccount);
export const UserChangeContext = createContext(function changeContext(data: OwnUserAccount){} as Dispatch<SetStateAction<OwnUserAccount>>);