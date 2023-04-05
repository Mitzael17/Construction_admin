import {BaseData, DefaultGetListParameters} from "./index";

export enum ProjectStatuses {

    inProcess = 'in process',
    finishedWithoutPage = 'finished without a project page',
    finished = 'finished',
    cancelled = 'cancelled'

}


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


export interface ProjectsListParameters extends DefaultGetListParameters {

    service_id?: number|number[],
    client_id?: number|number[],
    status_id?: number|number[],


}