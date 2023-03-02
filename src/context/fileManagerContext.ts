import {createContext, Dispatch, SetStateAction} from "react";
import {FileManagerContextValues} from "../types/contexts/FileManagerContextValues";

export const fileManagerContext = createContext<FileManagerContextValues>({} as FileManagerContextValues);

export const fileManagerChangeContext = createContext(function (data: FileManagerContextValues) {} as Dispatch<SetStateAction<FileManagerContextValues>>);