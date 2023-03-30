import {Dispatch, SetStateAction} from "react";
import {BaseData} from "../../../types/API";

export type SortProjectsValues = 'newest'|'oldest';

export interface FiltersProjectsContextValues {

    filterClients: BaseData[],
    filterStatuses: BaseData[],
    filterServices: BaseData[],

}

export interface FiltersProjectsChangeContextValues {

    setFilterClients: Dispatch<SetStateAction<BaseData[]>>,
    setFilterStatuses: Dispatch<SetStateAction<BaseData[]>>,
    setFilterServices: Dispatch<SetStateAction<BaseData[]>>,

}