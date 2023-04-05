import {createContext, Dispatch, SetStateAction} from "react";

export const SortContext = createContext('');

export const SortChangeContext = createContext(function () {} as Dispatch<SetStateAction<string>>)