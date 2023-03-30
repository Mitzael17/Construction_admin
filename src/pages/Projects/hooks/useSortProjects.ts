import {Dispatch, SetStateAction, useContext} from "react";
import {SortProjectsChangeContext, SortProjectsContext} from "../context/SortProjectsContext";
import {SortProjectsValues} from "../types";

export const useSortProjects: () => [SortProjectsValues, Dispatch<SetStateAction<SortProjectsValues>>]
    = () => [useContext(SortProjectsContext), useContext(SortProjectsChangeContext)];