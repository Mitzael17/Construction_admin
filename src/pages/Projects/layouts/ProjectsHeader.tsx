import React, {useEffect, useRef} from 'react';
import TinyInput from "../../../components/UI/Input/TinyInput";
import {useSearchContext} from "../../../hooks/contextHooks/useSearchContext";
import {useListItemsContext} from "../../../hooks/contextHooks/useListItemsContext";
import {useFiltersProjectsContext} from "../hooks/useFiltersProjectsContext";
import {useComponentDidMount} from "../../../hooks/useComponentDidMount";
import ProjectsAdd from "../components/headerComponents/ProjectsAdd";
import ProjectsFilter from "../components/headerComponents/ProjectsFilter";
import ProjectsSort from "../components/headerComponents/ProjectsSort";
import ProjectsDelete from "../components/headerComponents/ProjectsDelete";
import {useSortContext} from "../../../hooks/contextHooks/useSortContext";

const ProjectsHeader = () => {

    // Context values
    const [sort] = useSortContext();
    const [search, setSearch] = useSearchContext();
    const [, {resetItems: resetProjects}] = useListItemsContext();
    const [{filterServices, filterClients, filterStatuses}] = useFiltersProjectsContext();

    const didMount = useComponentDidMount();
    const prevSearch = useRef(search);

    useEffect(() => {

        if(!didMount) return;

        resetProjects();

    }, [filterClients, filterStatuses, filterServices, sort]);

    useEffect( () => {

        if(search === prevSearch.current) return;

        const timer = setTimeout( () => {

            prevSearch.current = search;

            resetProjects();

        }, 500);

        return () => {
            clearTimeout(timer);
        };

    }, [search])

    return (
        <div className="main__header mainHeader">
                <div className="kalaiIcon-container flex relative">
                    <ProjectsAdd />
                    <ProjectsFilter />
                    <ProjectsSort />
                    <ProjectsDelete />
                </div>
            <div className='mainHeader__search'>
                <TinyInput placeholder='Search...' value={search} setValue={setSearch} />
            </div>
        </div>
    );



};

export default ProjectsHeader;