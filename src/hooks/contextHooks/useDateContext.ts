import {DateChangeContextValues, DateContextValues} from "../../types/contexts/DateContextValues";
import {useContext} from "react";
import {DateChangeContext, DateContext} from "../../context/DateContext";

export const useDateContext: () => [DateContextValues, DateChangeContextValues] =
    () => [useContext(DateContext), useContext(DateChangeContext)];