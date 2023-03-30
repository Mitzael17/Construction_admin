import {useContext} from "react";
import {FiltersProjectsChangeContext, FiltersProjectsContext} from "../context/FiltersProjectsContext";
import {FiltersProjectsChangeContextValues, FiltersProjectsContextValues} from "../types";

export const useFiltersProjects: () => [FiltersProjectsContextValues, FiltersProjectsChangeContextValues]
    = () => [useContext(FiltersProjectsContext), useContext(FiltersProjectsChangeContext)];