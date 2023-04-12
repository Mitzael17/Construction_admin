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


export interface Project extends BaseData {

    creation_date: string,
    end_date: string|null
    client: BaseData
    service: BaseData,
    alias: string|null,
    status: BaseData

}

export interface ProjectUpdateData extends Partial<Pick<Project, 'name'|'end_date'>> {

    service_id?: number,
    client_id?: number,
    project_status_id?: number,
    new_comments?: Pick<ProjectComment, 'text'>[]

}


export interface ProjectComment extends Pick<BaseData, 'id'> {

    text: string,
    date: string,
    admin_id: number,
    admin_name: string,
    admin_image: string,

}