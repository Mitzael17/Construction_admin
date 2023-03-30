import React from 'react';
import ListItemsProvider from "../../../../components/Providers/ListItemsProvider";
import {ProjectsListParameters} from "../../../../types/API/projects";
import {$getProjects} from "../../../../api/projectsAPI";
import {ListItem} from "../../../../types/components/ListsComponents";
import {PROJECTS_ROUTE} from "../../../../data/paths";
import {useSortProjects} from "../../hooks/useSortProjects";
import {useSearch} from "../../../../hooks/useSearch";
import {useFiltersProjects} from "../../hooks/useFiltersProjects";

const ProjectsListProvider = ({children}: {children: JSX.Element}) => {

    const limit = 50;

    const [sort] = useSortProjects();
    const [search] = useSearch();

    const [{filterStatuses, filterClients, filterServices}] = useFiltersProjects();

    return (
        <ListItemsProvider limitLoadingItems={limit} callback={callbackLoading}>
            {children}
        </ListItemsProvider>
    );

    async function callbackLoading (page: number) {

        const parameters: ProjectsListParameters = {
            page,
            sort,
            search,
            limit
        };

        if(filterClients.length) parameters.client_id = filterClients.map(item => item.id);
        if(filterStatuses.length) parameters.status_id = filterStatuses.map(item => item.id);
        if(filterServices.length) parameters.service_id = filterServices.map(item => item.id);


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

    }

};

export default ProjectsListProvider;