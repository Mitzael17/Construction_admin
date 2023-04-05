import {Dispatch, SetStateAction, useContext} from "react";
import {SortChangeContext, SortContext} from "../../context/SortContext";

export const useSortContext: () => [string, Dispatch<SetStateAction<string>>]
    = () => [useContext(SortContext), useContext(SortChangeContext)];