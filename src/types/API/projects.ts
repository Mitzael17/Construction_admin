import {BaseData, DefaultGetListParameters} from "./index";
import {SortProjectsValues} from "../../pages/Projects/types";

export enum ProjectStatuses {

    inProcess = 'in process',
    finishedWithoutPage = 'finished without a project page',
    finished = 'finished',
    cancelled = 'cancelled'

}

export type ProjectStatus = 'in process'|'finished without a project page'|'finished'|'cancelled';

export interface ProjectCreateParameters {

    name: string,
    service_id: number,
    client_id: number

}


export interface ProjectsListItem extends BaseData {

    creation_date: string,
    end_date: string,
    service: string,
    client: string,
    status: ProjectStatuses

}

export type ProjectsList = ProjectsListItem[];


export interface ProjectsListParameters extends DefaultGetListParameters<SortProjectsValues> {

    service_id?: number|number[],
    client_id?: number|number[],
    status_id?: number|number[],


}