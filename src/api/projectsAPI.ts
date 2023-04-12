import {DefaultGetListParameters, EndPoints, ErrorResponse, PostResponse} from "../types/API";
import {$baseDeleteRequest, $baseGetRequest, $basePostRequest} from "./index";
import {
    Project, ProjectComment,
    ProjectCreateParameters,
    ProjectsList,
    ProjectsListParameters,
    ProjectUpdateData
} from "../types/API/projects";

export const $createProject = async (parameters: ProjectCreateParameters): Promise<PostResponse> => {

    return await $basePostRequest(EndPoints.projects, parameters);

}

export const $getProjects = async (parameters: ProjectsListParameters): Promise<ProjectsList> => {

    return await $baseGetRequest(EndPoints.projects, parameters);

}

export const $deleteProject = async (projects_id: number|string[]): Promise<PostResponse> => {

    return await $baseDeleteRequest(EndPoints.projects, {id: projects_id});

}


export const $getOneProject = async (id: number): Promise<Project|ErrorResponse> => {

    return await $baseGetRequest(EndPoints.project + id);

}


export const $updateProject = async (id: number, data: ProjectUpdateData): Promise<PostResponse> => {

    return await $basePostRequest(EndPoints.project + id, data);

}


export const $getComments = async (project_id: number, parameters: Pick<DefaultGetListParameters, 'page'|'limit'>): Promise<ProjectComment[]> => {

    return await $baseGetRequest(EndPoints.project + project_id, {...parameters, comments: true});

}