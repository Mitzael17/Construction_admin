import {useContext} from "react";
import {FiltersProjectsChangeContext, FiltersProjectsContext} from "../context/FiltersProjectsContext";
import {FiltersProjectsChangeContextValues, FiltersProjectsContextValues} from "../types";

export const useFiltersProjectsContext: () => [FiltersProjectsContextValues, FiltersProjectsChangeContextValues]
    = () => [useContext(FiltersProjectsContext), useContext(FiltersProjectsChangeContext)];