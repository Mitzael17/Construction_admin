import {useContext} from "react";
import {userChangeContext} from "../context/userContext";

export const useUserChange = () => useContext(userChangeContext);