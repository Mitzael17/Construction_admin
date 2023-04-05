import React from 'react';
import ProjectsList from "../components/ProjectsList";
import Loading from "../../../components/Visual/Loading";
import {useListItemsContext} from "../../../hooks/contextHooks/useListItemsContext";

const ProjectsContent = () => {

    const [{nodeRef, isOver, isLoading}] = useListItemsContext();

    return (
        <div className='main__content'>
            <ProjectsList />
            <div ref={nodeRef}></div>
            {isOver && <div className='endLine'></div>}
            {isLoading && <div className='mt-20px center-x'><Loading /></div>}
        </div>
    );
};

export default ProjectsContent;