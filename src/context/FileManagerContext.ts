import {createContext, Dispatch, SetStateAction} from "react";
import {FileManagerContextValues} from "../types/contexts/FileManagerContextValues";

export const FileManagerContext = createContext<FileManagerContextValues>({} as FileManagerContextValues);

export const FileManagerChangeContext = createContext(function (data: FileManagerContextValues) {} as Dispatch<SetStateAction<FileManagerContextValues>>);