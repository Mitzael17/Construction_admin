import React, {memo, useState} from 'react';
import FilterIcon from "../../../../components/Icons/KalaiIcons/FilterIcon";
import Modal from "../../../../components/Modals/Modal";
import FilterProjectModalContent from "../modalContents/FilterProjectModalContent/FilterProjectModalContent";
import {useFiltersProjects} from "../../hooks/useFiltersProjects";

const ProjectsFilter = memo( () => {

    const [showModal, setShowModal] = useState(false);

    // Context values
    const [
        {filterServices, filterClients, filterStatuses},
        {setFilterStatuses, setFilterServices, setFilterClients}
    ] = useFiltersProjects();

    return (
        <>
            <div className='kalaiIcon--box' onClick={() => {setShowModal(true)}}>
                <FilterIcon />
            </div>
            <Modal title='Filters' value={showModal} setValue={setShowModal}>
                <FilterProjectModalContent
                    statuses={filterStatuses}
                    clients={filterClients}
                    setClient={setFilterClients}
                    setStatus={setFilterStatuses}
                    setService={setFilterServices}
                    service={filterServices}
                />
            </Modal>
        </>
    );
});

export default ProjectsFilter;