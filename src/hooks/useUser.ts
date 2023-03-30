import {Dispatch, SetStateAction, useContext} from "react";
import {UserChangeContext, UserContext} from "../context/UserContext";
import {OwnUserAccount} from "../types/API/usersAPI";


export const useUser = (): [OwnUserAccount, Dispatch<SetStateAction<OwnUserAccount>>] =>
    [useContext(UserContext), useContext(UserChangeContext)];