import React, {useEffect, useRef} from 'react';
import TinyInput from "../../../components/UI/Input/TinyInput";
import {useSortProjects} from "../hooks/useSortProjects";
import {useSearch} from "../../../hooks/contextHooks/useSearch";
import {useListItems} from "../../../hooks/contextHooks/useListItems";
import {useFiltersProjects} from "../hooks/useFiltersProjects";
import {useComponentDidMount} from "../../../hooks/useComponentDidMount";
import ProjectsAdd from "../components/headerComponents/ProjectsAdd";
import ProjectsFilter from "../components/headerComponents/ProjectsFilter";
import ProjectsSort from "../components/headerComponents/ProjectsSort";
import ProjectsDelete from "../components/headerComponents/ProjectsDelete";

const ProjectsHeader = () => {

    // Context values
    const [sort] = useSortProjects();
    const [search, setSearch] = useSearch();
    const [, {resetItems: resetProjects}] = useListItems();
    const [{filterServices, filterClients, filterStatuses}] = useFiltersProjects();

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
        <>
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

        </>
    );



};

export default ProjectsHeader;