import {createContext, Dispatch, SetStateAction} from "react";
import {SortProjectsValues} from "../types";

export const SortProjectsContext = createContext<SortProjectsValues>('newest');

export const SortProjectsChangeContext = createContext(function () {} as Dispatch<SetStateAction<SortProjectsValues>>);