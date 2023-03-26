import {EndPoints, PostResponse} from "../types/API";
import {$authAPI} from "./index";
import {ProjectCreateParameters, ProjectsList, ProjectsListParameters} from "../types/API/projects";

export const $createProject = async (parameters: ProjectCreateParameters): Promise<PostResponse> => {

    const {data} = await $authAPI.post('/projects', parameters);

    return data;

}

export const $getProjects = async (parameters: ProjectsListParameters): Promise<ProjectsList> => {

    const {data}: {data: ProjectsList} = await $authAPI.get(EndPoints.projects, {
        params: parameters
    });

    return data;

}


export const $deleteProject = async (projects_id: number|string[]): Promise<PostResponse> => {

    const {data} = await $authAPI.delete(EndPoints.projects, {
        data: {
            id: projects_id
        }
    });

    return data;

}