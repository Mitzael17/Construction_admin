import React, {FormEvent, useMemo, useRef, useState} from 'react';
import ProjectContentHeader from "../components/ContentComponents/ProjectContentHeader";
import {useProjectContext} from "../hooks/useProjectContext";
import Input from "../../../components/UI/Input/Input";
import Error from "../../../components/Messages/Error";
import {useValidation} from "../../../hooks/useValidation";
import {getError} from "../../../utils/getError";
import {UseValidation} from "../../../types/hooks";
import {isEqual} from "../../../utils/isEqual";
import {BaseData, PostResponse} from "../../../types/API";
import SearchBox from "../../../components/UI/SearchBox/SearchBox";
import {$updateProject} from "../../../api/projectsAPI";
import Modal from "../../../components/Modals/Modal";
import StatusResponse from "../../../components/Visual/StatusResponse";
import {Tables} from "../../../types/components/UIComponents";
import Select from "../../../components/UI/Select/Select";
import {useListForeignKeys} from "../../../hooks/useListForeignKeys";
import {dateToFormat} from "../../../utils/date";


const ProjectContent = () => {

    const [{name}, setProjectData] = useProjectContext();
    const [isLoading, setIsLoading] = useState(false);

    const validationOptions = useMemo<UseValidation[]>(() => ([
        {
            name: 'name',
            value: name,
            max: 100,
            min: 1
        }
    ]), [name])


    const [errors] = useValidation(validationOptions);

    const nameError = getError(errors, 'name');

    const [projectData] = useProjectContext();
    const initialProjectData = useRef(projectData);

    const isAvailableToSubmit = nameError === undefined && !isEqual(projectData, initialProjectData.current) && !isLoading;

    const [showModal, setShowModal] = useState(false);
    const response = useRef<PostResponse|null>(null);

    const [, , statuses, isLoadingStatuses] = useListForeignKeys({table: Tables.project_statuses, limit: 1000});


    return (
        <form onSubmit={handlerSubmit} className='projectContent flex-grow-1 min-w-500px media'>
            <ProjectContentHeader isLoading={isLoading} alias={projectData.alias} isAvailableToSubmit={isAvailableToSubmit} />
            <div className={`mt-20px ${nameError !== undefined ? 'error-input' : ''}`}>
                <Input placeholder='Project name' value={name} setValue={(value: string) => {setProjectData(prev => ({...prev, name: value}) )}} />
                <Error value={nameError !== undefined}>{nameError?.message ?? ''}</Error>
            </div>
            <div className='mt-20px'>
                <Select
                    items={statuses}
                    value={projectData.status}
                    setValue={(value: BaseData) => setProjectData(prev => ({...prev, status: value}))}
                    isLoading={isLoadingStatuses}
                    label='Status:'
                />
            </div>
            <div className='mt-20px'>
                <div className='mb-10px label'>
                    Client: {projectData.client.name}
                </div>
                <SearchBox
                    placeholder='Search client...'
                    chosenValue={projectData.client}
                    setChosenValue={(value: BaseData) => {
                        setProjectData(prev => ({...prev, client: value}))
                    }}
                    table={Tables.clients}
                    initialSearchValue={projectData.client.name}
                />
            </div>
            <div className='mt-20px'>
                <div className='mb-10px label'>
                    Service: {projectData.service.name}
                </div>
                <SearchBox
                    placeholder='Search service...'
                    chosenValue={projectData.service}
                    setChosenValue={(value: BaseData) => {
                        setProjectData(prev => ({...prev, service: value}))
                    }}
                    table={Tables.services}
                    initialSearchValue={projectData.service.name}
                />
            </div>
            <Modal title='Response' value={showModal} setValue={setShowModal} >
                <>
                    { response.current !== null && <StatusResponse response={response.current} />}
                </>
            </Modal>
        </form>
    );


    async function handlerSubmit(event: FormEvent) {

        event.preventDefault();

        if(!isAvailableToSubmit) return;

        setIsLoading(true);
        initialProjectData.current = projectData;


        const result = await $updateProject(projectData.id, {
            name,
            project_status_id: projectData.status.id,
            client_id: projectData.client.id,
            end_date: projectData.status.id !== 1 ? dateToFormat(new Date(), 'Y-m-d') : null,
        });

        setShowModal(true);
        setIsLoading(false);
        response.current = result;

    }

};

export default ProjectContent;