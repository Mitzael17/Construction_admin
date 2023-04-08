import React, {useEffect, useMemo} from 'react';
import ProjectsHeader from "./layouts/ProjectsHeader";
import ProjectsContent from "./layouts/ProjectsContent";
import {useSortContext} from "../../hooks/contextHooks/useSortContext";
import {useListItemsContext} from "../../hooks/contextHooks/useListItemsContext";
import {useFiltersProjectsContext} from "./hooks/useFiltersProjectsContext";
import {useComponentDidMount} from "../../hooks/useComponentDidMount";
import FiltersBlock from "../../components/Blocks/FiltersBlock/FiltersBlock";
import {FiltersBlockItem} from "../../types/components/Blocks";
import {concatArrObjectValues} from "../../utils/concatArrObjectValues";



const Projects = () => {

    const [sort] = useSortContext();
    const [, {resetItems: resetProjects}] = useListItemsContext();
    const [
        {filterServices, filterClients, filterStatuses},
        {setFilterClients, setFilterServices, setFilterStatuses}
    ] = useFiltersProjectsContext();

    const didMount = useComponentDidMount();

    useEffect(() => {

        if(!didMount) return;

        resetProjects();

    }, [filterClients, filterStatuses, filterServices, sort]);

    const filtersBlockData: FiltersBlockItem[] = useMemo(() => [
            {
                displayedValue: `Clients: ${concatArrObjectValues(filterClients, 'name')}`,
                setValue: setFilterClients,
                valueToSet: [],
                value: filterClients
            },
            {
                displayedValue: `Services: ${concatArrObjectValues(filterServices, 'name')}`,
                setValue: setFilterServices,
                valueToSet: [],
                value: filterServices
            },
            {
                displayedValue: `Project statuses: ${concatArrObjectValues(filterStatuses, 'name')}`,
                setValue: setFilterStatuses,
                valueToSet: [],
                value: filterStatuses
            }
        ], [filterClients, filterStatuses, filterServices]);

    return (
        <div className='main'>
            <ProjectsHeader />
            <FiltersBlock values={filtersBlockData} />
            <ProjectsContent />
        </div>
    );

};

export default Projects;