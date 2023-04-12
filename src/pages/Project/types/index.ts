import {Project, ProjectComment} from "../../../types/API/projects";
import {Dispatch, SetStateAction} from "react";

export type ProjectWithoutComments = Omit<Project, 'comments'>;


export interface ProjectContentHeaderProps extends Pick<Project, 'alias'> {

    isAvailableToSubmit: boolean,
    isLoading: boolean

}

export interface ProjectCommentsAreaProps {

    isOver: boolean,
    isLoading: boolean,
    comments: ProjectComment[]

}

export interface ProjectCommentsFormProps {

    setComments: Dispatch<SetStateAction<ProjectComment[]>>

}