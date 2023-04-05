import {useContext} from "react";
import {RoutesContext} from "../../context/RoutesContext";

export const useInternalRoutesContext = () => useContext(RoutesContext);