import React from 'react';
import TinyInput from "../../../components/UI/Input/TinyInput";
import {useListItemsContext} from "../../../hooks/contextHooks/useListItemsContext";
import ProjectsAdd from "../components/headerComponents/ProjectsAdd";
import ProjectsFilter from "../components/headerComponents/ProjectsFilter";
import ProjectsSort from "../components/headerComponents/ProjectsSort";
import ProjectsDelete from "../components/headerComponents/ProjectsDelete";
import {useSearchForSearchContext} from "../../../hooks/useSearchForSearchContext";


const ProjectsHeader = () => {

    const [, {resetItems: resetProjects}] = useListItemsContext();
    const [search, setSearch] = useSearchForSearchContext(resetProjects);

    return (
        <div className="main__header mainProjectsHeader">
            <div className='flex'>
                <div className="kalaiIcon-container flex relative">
                    <ProjectsAdd />
                    <ProjectsFilter />
                    <ProjectsSort />
                    <ProjectsDelete />
                </div>
            </div>
            <div className='mainProjectsHeader__search'>
                <TinyInput placeholder='Search...' value={search} setValue={setSearch} />
            </div>
        </div>
    );

};

export default ProjectsHeader;