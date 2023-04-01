import {EndPoints, PostResponse} from "../types/API";
import {$baseDeleteRequest, $baseGetRequest, $basePostRequest} from "./index";
import {ProjectCreateParameters, ProjectsList, ProjectsListParameters} from "../types/API/projects";

export const $createProject = async (parameters: ProjectCreateParameters): Promise<PostResponse> => {

    return await $basePostRequest(EndPoints.projects, parameters);

}

export const $getProjects = async (parameters: ProjectsListParameters): Promise<ProjectsList> => {

    return await $baseGetRequest(EndPoints.projects, parameters);

}


export const $deleteProject = async (projects_id: number|string[]): Promise<PostResponse> => {

    return await $baseDeleteRequest(EndPoints.projects, {id: projects_id});

}