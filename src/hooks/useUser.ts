import {useContext} from "react";
import {userContext} from "../context/userContext";
import {OwnUserAccount} from "../types/API/usersAPI";


export const useUser = (): OwnUserAccount => useContext(userContext);