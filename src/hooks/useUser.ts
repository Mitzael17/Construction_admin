import {Dispatch, SetStateAction, useContext} from "react";
import {userChangeContext, userContext} from "../context/userContext";
import {OwnUserAccount} from "../types/API/usersAPI";


export const useUser = (): [OwnUserAccount, Dispatch<SetStateAction<OwnUserAccount>>] =>
    [useContext(userContext), (function () { return useContext(userChangeContext)})()];