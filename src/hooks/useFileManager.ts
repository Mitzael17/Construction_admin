import {Dispatch, SetStateAction, useContext} from "react";
import {fileManagerChangeContext, fileManagerContext} from "../context/fileManagerContext";
import {FileManagerContextValues} from "../types/contexts/FileManagerContextValues";

export const useFileManager = (): [FileManagerContextValues, Dispatch<SetStateAction<FileManagerContextValues>>] =>
    [useContext(fileManagerContext), useContext(fileManagerChangeContext)];