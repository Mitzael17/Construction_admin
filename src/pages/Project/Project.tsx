import React from 'react';
import ProjectContent from "./layouts/ProjectContent";
import ProjectComments from "./layouts/ProjectComments";

const Project = () => {

    return (
        <div className='main'>
            <div className="flex gap-30px flex-wrap">
                <ProjectContent />
                <ProjectComments />
            </div>
        </div>
    );
};

export default Project;