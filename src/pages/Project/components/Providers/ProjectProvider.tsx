import React, {useEffect, useRef, useState} from 'react';
import {ProjectWithoutComments} from "../../types";
import {$getOneProject} from "../../../../api/projectsAPI";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../../../../components/Visual/Loading";
import {ProjectChangeContext, ProjectContext} from "../../context/ProjectContext";
import NotFound from "../../../../components/Visual/notFound/NotFound";
import Button from "../../../../components/UI/Button/Button";
import {PROJECTS_ROUTE} from "../../../../data/paths";
import ArrowLeftIcon from "../../../../components/Icons/KalaiIcons/ArrowLeftIcon";

const ProjectProvider = ({children}: {children: JSX.Element}) => {

    const [projectData, setProjectData] = useState<ProjectWithoutComments>({} as ProjectWithoutComments);
    const [isLoading, setIsLoading] = useState(true);

    const errorMessage = useRef('The project id is invalid!');

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        (async function() {

            if(id === undefined || isNaN(+id)) {

                setIsLoading(false);
                return;

            }

            const response = await $getOneProject(+id);

            if('message' in response) {

                errorMessage.current = response.message;
                setIsLoading(false);

                return;

            }

            setProjectData(response);

            setIsLoading(false);

        })();

    }, []);

    return (
        <>
            {isLoading && <div className='pos-abs-center'><Loading /></div>}
            {!isLoading && Object.keys(projectData).length > 0 && (
                <ProjectContext.Provider value={projectData}>
                    <ProjectChangeContext.Provider value={setProjectData}>
                        {children}
                    </ProjectChangeContext.Provider>
                </ProjectContext.Provider>
            )}
            {!isLoading && Object.keys(projectData).length === 0 && (
                <NotFound>
                    <>
                        <h2 className='mb-10px'>The project wasn't found!</h2>
                        <Button onClick={() => navigate(PROJECTS_ROUTE)}> <ArrowLeftIcon /> Go back to all projects</Button>
                    </>
                </NotFound>
            )}
        </>
    );
};

export default ProjectProvider;