import React from 'react';
import ProjectProvider from "./components/Providers/ProjectProvider";
import Project from "./Project";

const ProjectPage = () => {

    return (
        <ProjectProvider>
            <Project />
        </ProjectProvider>
    );
};

export default ProjectPage;