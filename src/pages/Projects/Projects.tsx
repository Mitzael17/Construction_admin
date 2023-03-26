import React, {useEffect, useReducer, useRef, useState} from 'react';
import TinyInput from "../../components/UI/Input/TinyInput";
import FilterIcon from "../../components/Icons/KalaiIcons/FilterIcon";
import SortIcon from "../../components/Icons/KalaiIcons/SortIcon";
import AddCircleIcon from "../../components/Icons/KalaiIcons/AddCircleIcon";
import Modal from "../../components/Modals/Modal";
import CreateNewProjectModalContent from "./components/modalContents/CreateNewProjectModalContent";
import DeleteIcon from "../../components/Icons/KalaiIcons/DeleteIcon";
import ProjectList from "./components/ProjectList";
import {$deleteProject, $getProjects} from "../../api/projectsAPI";
import {useStateCallback} from "../../hooks/useStateCallback";
import {useLazyLoading} from "../../hooks/useLazyLoading";
import {ListItem} from "../../types/components/ListsComponents";
import {PROJECTS_ROUTE} from "../../data/paths";
import Loading from "../../components/Visual/Loading";
import {useOutClick} from "../../hooks/useOutClick";
import FilterProjectModalContent from "./components/modalContents/FilterProjectModalContent";
import {BaseData, PostResponse, Statuses} from "../../types/API";
import {useComponentDidMount} from "../../hooks/useComponentDidMount";
import {ProjectsListParameters} from "../../types/API/projects";
import {CheckedItemsActions, ReducerTypes} from "../../types";
import StatusResponse from "../../components/Visual/StatusResponse";



const Projects = () => {

    const [searchValue, setSearchValue] = useState('');
    const prevSearchValue = useRef(searchValue);

    const [filterClients, setFilterClients] = useState<BaseData[]>([]);
    const [filterStatuses, setFilterStatuses] = useState<BaseData[]>([]);
    const [filterServices, setFilterServices] = useState<BaseData[]>([]);

    const didMount = useComponentDidMount();


    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [showResponseDeleteModal, setShowResponseDeleteModal] = useState(false);

    const [deleteLoading, setDeleteLoading] = useState(false);

    const [checkedProjects, dispatchCheckedProjects] = useReducer(reducerCheckedProjects, []);

    const sortListRef = useRef<HTMLDivElement>(null);
    const [showSortList, setShowSortList] = useOutClick(sortListRef);

    const nodeRef = useRef<HTMLDivElement>(null);

    const [sort, setSort] = useStateCallback<'newest'|'oldest'>('newest', (value) => {

        resetProjects();
        return value;

    });

    let limitLoadingProjects = 50;

    const [projects, setProjects, isLoading, isOver, resetProjects] = useLazyLoading<ListItem>(nodeRef, limitLoadingProjects, async (page) => {

        const parameters: ProjectsListParameters = {
            page,
            sort,
            search: searchValue,
            limit: limitLoadingProjects
        };

        if(filterClients.length) parameters.client_id = filterClients.map(item => item.id);
        if(filterStatuses.length) parameters.status_id = filterStatuses.map(item => item.id);


        const response = await $getProjects(parameters);

        const result: ListItem[] = response.map( item => {

            return {
                id: item.id,
                title: item.name,
                subtitle: <><div>Client: {item.client}</div><div className='mt-5px mb-10px'>Status: {item.status}</div></>,
                date: item.creation_date,
                status: item.status,
                link: PROJECTS_ROUTE + item.id
            }

        });

        return result;

    });

    const deleteResponse = useRef<PostResponse>();

    useEffect(() => {

        if(!didMount) return;

        resetProjects();

    }, [filterClients, filterStatuses, filterServices]);

    useEffect( () => {

        if(searchValue === prevSearchValue.current) return;

        const timer = setTimeout( () => {

            prevSearchValue.current = searchValue;

            resetProjects();

        }, 500);

        return () => {
            clearTimeout(timer);
        };

    }, [searchValue])

    return (
        <div className='main'>
            <div className="main__header flex flex-wrap flex-a-c w-100 mt-20px mb-10px pl-20px pr-20px pt-10px pb-10px">
                <div className='flex mr-20px'>
                    <div className="kalaiIcon-container flex relative">
                        <div onClick={() => {setShowCreateModal(true)}} className='kalaiIcon--box'>
                            <AddCircleIcon />
                        </div>
                        <div className='kalaiIcon--box' onClick={() => {setShowFilterModal(true)}}>
                            <FilterIcon />
                        </div>
                        <div
                            className='kalaiIcon--box'
                            ref={sortListRef}
                            onClick={() => {
                                setShowSortList(prev => !prev);
                            }}>
                            <SortIcon />
                            <ul className={`list ${showSortList ? 'active' : ''}`}>
                                <li className={`list__item ${sort === 'newest' ? 'active' : ''}`} onClick={() => {changeSort('newest')}}>Newest</li>
                                <li className={`list__item ${sort === 'oldest' ? 'active' : ''}`} onClick={() => {changeSort('oldest')}}>Oldest</li>
                            </ul>
                        </div>
                        <div className='kalaiIcon--box' onClick={deleteProjects}>
                            <DeleteIcon />
                        </div>
                    </div>
                    {deleteLoading && <div className='ml-15px flex flex-a-c'><Loading diameter={20} showText={false} /></div>}
                </div>
                <div className='w-350px ml-auto'>
                    <TinyInput placeholder='Search...' value={searchValue} setValue={setSearchValue} />
                </div>
            </div>
            <div className='main__content'>
                <ProjectList checkedProjects={checkedProjects} projects={projects} dispatchCheckedProjects={dispatchCheckedProjects} />
                <div ref={nodeRef}></div>
                {isOver && <div className='endLine'></div>}
                {isLoading && <div className='mt-20px center-x'><Loading /></div>}
            </div>
            <Modal title='Create a new project' value={showCreateModal} setValue={setShowCreateModal}>
                <CreateNewProjectModalContent addProject={addProject} />
            </Modal>
            <Modal title='Filter' value={showFilterModal} setValue={setShowFilterModal}>
                <FilterProjectModalContent
                    statuses={filterStatuses}
                    clients={filterClients}
                    setClient={setFilterClients}
                    setStatus={setFilterStatuses}
                    setService={setFilterServices}
                    service={filterServices}
                />
            </Modal>
            <Modal title='Response' value={showResponseDeleteModal} setValue={setShowResponseDeleteModal}>
                {deleteResponse.current ? <StatusResponse response={deleteResponse.current} />: <></>}
            </Modal>
        </div>
    );

    async function deleteProjects() {

        if(!checkedProjects.length) return;

        setDeleteLoading(true);

        const response = await $deleteProject(checkedProjects);

        setDeleteLoading(false);
        dispatchCheckedProjects({type: ReducerTypes.Reset});

        if(response.status === Statuses.success) {

            setProjects(prevState => prevState.filter(item => checkedProjects.indexOf(`${item.id}`) === -1));
            return;

        }

        const filteredProjects = response.arr_id !== undefined ? checkedProjects.filter( id => (response.arr_id as number[]).indexOf(+id) === -1) : checkedProjects;

        setProjects(prevState => prevState.filter(item => filteredProjects.indexOf(`${item.id}`) === -1));

        deleteResponse.current = response;
        setShowResponseDeleteModal(true);

    }

    function addProject(project: ListItem) {

        if(sort === 'newest') {

            setProjects(prevState => [project, ...prevState]);
            return;

        }

        if(sort === 'oldest' && isOver) setProjects(prevState => [...prevState, project]);

    }

    function changeSort(value: 'newest'|'oldest') {

        setSort(value);

    }

    function reducerCheckedProjects(state: string[], action: CheckedItemsActions) {

        switch (action.type) {

            case ReducerTypes.Add: {

                return [...state, action.payload];

            }
            case ReducerTypes.Delete: {

                return state.filter(item => item !== action.payload);

            }
            case ReducerTypes.Reset: {

                return [];

            }

        }

    }

};

export default Projects;