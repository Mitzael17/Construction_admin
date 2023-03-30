import React from 'react';
import Projects from "./Projects";
import MainProjectsProvider from "./components/Providers/MainProjectsProvider";


const ProjectsPage = () => {

    return (
        <MainProjectsProvider>
            <Projects />
        </MainProjectsProvider>
    );
};

export default ProjectsPage;