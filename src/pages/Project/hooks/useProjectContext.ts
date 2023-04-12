import {Dispatch, SetStateAction, useContext} from "react";
import {ProjectChangeContext, ProjectContext} from "../context/ProjectContext";
import {ProjectWithoutComments} from "../types";

export const useProjectContext: () => [ProjectWithoutComments, Dispatch<SetStateAction<ProjectWithoutComments>>] =
    () => [useContext(ProjectContext), useContext(ProjectChangeContext)];