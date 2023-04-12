import React, {useEffect, useRef, useState} from 'react';
import {ProjectWithoutComments} from "../../types";
import {$getOneProject} from "../../../../api/projectsAPI";
import {useParams} from "react-router-dom";
import Loading from "../../../../components/Visual/Loading";
import {ProjectChangeContext, ProjectContext} from "../../context/ProjectContext";

const ProjectProvider = ({children}: {children: JSX.Element}) => {

    const [projectData, setProjectData] = useState<ProjectWithoutComments>({} as ProjectWithoutComments);

    const [isLoading, setIsLoading] = useState(true);

    const errorMessage = useRef('The project id is invalid!');

    const {id} = useParams();

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
                <div>404</div>
            )}
        </>
    );
};

export default ProjectProvider;