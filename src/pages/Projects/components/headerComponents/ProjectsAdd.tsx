import React, {memo, useState} from 'react';
import AddCircleIcon from "../../../../components/Icons/KalaiIcons/AddCircleIcon";
import Modal from "../../../../components/Modals/Modal";
import CreateNewProjectModalContent from "../modalContents/CreateNewProjectModalContent/CreateNewProjectModalContent";
import {ListItem} from "../../../../types/components/ListsComponents";
import {useListItemsContext} from "../../../../hooks/contextHooks/useListItemsContext";
import {useSortContext} from "../../../../hooks/contextHooks/useSortContext";
import {DefaultSorts} from "../../../../types/contexts/SortContext";

const ProjectsAdd = memo(() => {

    const [showModal, setShowModal] = useState(false);

    //context values
    const [sort] = useSortContext();
    const [{isOver}, {setItems: setProjects}] = useListItemsContext();

    return (
        <>
            <div onClick={() => {setShowModal(true)}} className='kalaiIcon--box'>
                <AddCircleIcon />
            </div>
            <Modal title='Create a new project' value={showModal} setValue={setShowModal}>
                <CreateNewProjectModalContent addProject={addProject} />
            </Modal>
        </>
    );


    function addProject(project: ListItem) {

        if(sort === DefaultSorts.new) setProjects(prevState => [project, ...prevState]);

        if(sort === DefaultSorts.old && isOver) setProjects(prevState => [...prevState, project]);

    }

});

export default ProjectsAdd;