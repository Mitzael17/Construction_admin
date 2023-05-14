import {Project, ProjectComment} from "../../../types/API/projects";
import {Dispatch, MutableRefObject, SetStateAction} from "react";

export type ProjectWithoutComments = Omit<Project, 'comments'>;


export interface ProjectContentHeaderProps extends Pick<Project, 'alias'> {

    isAvailableToSubmit: boolean,
    isLoading: boolean

}

export interface ProjectCommentsAreaProps {

    isOver: boolean,
    isLoading: boolean,
    comments: ProjectComment[],
    socket: MutableRefObject<WebSocket|null>,
    setEditingComment: Dispatch<SetStateAction<null|ProjectComment>>


}


export interface ProjectCommentsFormProps {

    socket: MutableRefObject<WebSocket|null>,
    areaRef: MutableRefObject<HTMLDivElement|null>,
    editingComment: ProjectComment|null,
    setEditingComment: Dispatch<SetStateAction<null|ProjectComment>>,
    setLoadingRequest: Dispatch<SetStateAction<boolean>>,
    loadingRequest: boolean

}


export interface ProjectMessageProps {


    comment: ProjectComment,
    socket: MutableRefObject<WebSocket|null>,
    setEditingComment: Dispatch<SetStateAction<null|ProjectComment>>

}