import {createContext, Dispatch, SetStateAction} from "react";
import {ProjectWithoutComments} from "../types";

export const ProjectContext = createContext({} as ProjectWithoutComments);

export const ProjectChangeContext = createContext(function () {} as Dispatch<SetStateAction<ProjectWithoutComments>>);