import React, {useRef} from 'react';
import ProjectCommentsArea from "../components/CommentsComponents/ProjectCommentsArea";
import ProjectCommentsForm from "../components/CommentsComponents/ProjectCommentsForm";
import {useLazyLoading} from "../../../hooks/useLazyLoading";
import {$getComments} from "../../../api/projectsAPI";
import {useParams} from "react-router-dom";
import {ProjectComment} from "../../../types/API/projects";

const ProjectComments = () => {

    const triggerRef = useRef<HTMLDivElement>(null);
    const limit = 50;

    const {id} = useParams();

    const [comments, setComments, isLoading, isOver] = useLazyLoading<ProjectComment>(triggerRef, limit, loadComments);

    return (
        <div className='min-w-500px media flex-size-500px flex flex-column flex-grow-1'>
            <ProjectCommentsArea comments={comments} ref={triggerRef} isLoading={isLoading} isOver={isOver} />
            <ProjectCommentsForm setComments={setComments} />
        </div>
    );

    async function loadComments(page: number) {

        if(!id) return [];

        return await $getComments(+id, {page, limit});

    }

};

export default ProjectComments;