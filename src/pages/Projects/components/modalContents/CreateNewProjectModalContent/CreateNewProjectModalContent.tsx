import React, {FormEvent, useEffect, useMemo, useState} from 'react';
import Input from "../../../../../components/UI/Input/Input";
import Button from "../../../../../components/UI/Button/Button";
import {BaseData, PostResponse, Statuses} from "../../../../../types/API";
import SearchBox from "../../../../../components/UI/SearchBox/SearchBox";
import Loading from "../../../../../components/Visual/Loading";
import StatusResponse from "../../../../../components/Visual/StatusResponse";
import {$createProject} from "../../../../../api/projectsAPI";
import {ProjectCreateParameters, ProjectStatuses} from "../../../../../types/API/projects";
import {useValidation} from "../../../../../hooks/useValidation";
import Error from "../../../../../components/Messages/Error";
import {hasError} from "../../../../../utils/hasError";
import {useModalContext} from "../../../../../hooks/contextHooks/useModalContext";
import {ListItem} from "../../../../../types/components/ListsComponents";
import {dateToFormat} from "../../../../../utils/date";
import classes from "./CreateNewProjectModalContent.module.scss";

const CreateNewProjectModalContent = ({addProject}: {addProject: (project: ListItem) => void}) => {

    const [, setModalData] = useModalContext();

    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<null|PostResponse>(null);

    // Form values
    const [name, setName] = useState('');
    const [chosenClient, setChosenClient] = useState<BaseData>({} as BaseData);
    const [chosenService, setChosenService] = useState<BaseData>({} as BaseData);


    const validationOptions = useMemo( () => ([
        {
            name: 'name',
            value: name,
            min: 1,
            max: 100
        },
        {
            name: 'client_id',
            value: chosenClient.id,
            callbackChecker: (value: number|undefined) => {

                if(typeof value === 'undefined') return {isValid: false, message: 'You must choose client'}

                return {isValid: true, message: ''}

            },
        },
        {
            name: 'service_id',
            value: chosenService.id,
            callbackChecker: (value) => {

                if(typeof value === 'undefined') return {isValid: false, message: 'You must choose service'}

                return {isValid: true, message: ''}

            },
        }
    ]), [name, chosenService, chosenClient]);

    const [errors, isLoadingValidation] = useValidation(validationOptions);

    // Check errors
    const nameError = hasError(errors, 'name');
    const clientError = hasError(errors, 'client_id');
    const serviceError = hasError(errors, 'service_id');

    const isNotAvailableToSubmit = errors.length > 0 || isLoading || isLoadingValidation || hasEmptyField();

    useEffect(() => {

        if(!response) return;

        setModalData(prevData => ({
            ...prevData,
            class: undefined,
        }));
        setResponse(null);


    }, [chosenClient, chosenService, name]);

    return (
        <form onSubmit={handleSubmit} action='Projects/components/modalContents#' className='defaultForm'>
            <div className={nameError ? 'error-input' : ''}>
                <Input placeholder='Project name' value={name} setValue={setName} />
                <Error value={!!nameError}>{nameError ? nameError.message : ''}</Error>
            </div>
            <div className={classes.container}>
                <div className={classes.item}>
                    <SearchBox
                        setChosenValue={setChosenClient}
                        chosenValue={chosenClient}
                        placeholder='Search client...'
                        table='clients'
                    />
                    <Error value={!!clientError}>{clientError ? clientError.message : ''}</Error>
                </div>
                <div className={classes.item}>
                    <SearchBox
                        setChosenValue={setChosenService}
                        placeholder='Search service...'
                        chosenValue={chosenService}
                        table='services'
                    />
                    <Error value={!!serviceError}>{serviceError ? serviceError.message : ''}</Error>
                </div>
            </div>
            <Button disabled={isNotAvailableToSubmit} type='submit'>Save</Button>
            {isLoading && <Loading />}
            {response && !isLoading && <StatusResponse response={response} />}
        </form>
    );

    async function handleSubmit(event: FormEvent) {

        event.preventDefault();

        if(isNotAvailableToSubmit) return false;

        setIsLoading(true);

        const parameters: ProjectCreateParameters = {
            name: name,
            service_id: chosenService.id,
            client_id: chosenClient.id
        };

        const date = new Date();

        const newProject: ListItem = {
            id: 0,
            title: name,
            subtitle:  <>
                <div>Client: {chosenClient.name}</div>
                <div className='mt-5px'>Service: {chosenService.name}</div>
                <div className='mt-5px mb-15px'>Status: {ProjectStatuses.inProcess}</div>
            </>,
            date: `Date: ${dateToFormat(date, 'Y-m-d')}`,
            status: ProjectStatuses.inProcess
        };

        const response = await $createProject(parameters);

        setIsLoading(false);
        setResponse(response);

        setModalData(prevData => ({
            ...prevData,
            class: `${response.status}-background`
        }));

        if(response.status === Statuses.success && response.id !== undefined) {

            newProject.id = response.id;
            newProject.link = `${response.id}`;

            addProject(newProject);

        }

    }

    function hasEmptyField(): boolean {

        return name.length === 0 || !chosenClient.id || !chosenService.id;

    }

};

export default CreateNewProjectModalContent;