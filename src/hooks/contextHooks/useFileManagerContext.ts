import {Dispatch, SetStateAction, useContext} from "react";
import {FileManagerChangeContext, FileManagerContext} from "../../context/FileManagerContext";
import {FileManagerContextValues} from "../../types/contexts/FileManagerContextValues";

export const useFileManagerContext = (): [FileManagerContextValues, Dispatch<SetStateAction<FileManagerContextValues>>] =>
    [useContext(FileManagerContext), useContext(FileManagerChangeContext)];