import {createContext, Dispatch, SetStateAction} from "react";

export const SearchContext = createContext('');

export const SearchChangeContext = createContext(function() {} as Dispatch<SetStateAction<string>>);