import React, {memo, useState} from 'react';
import AddCircleIcon from "../../../../components/Icons/KalaiIcons/AddCircleIcon";
import Modal from "../../../../components/Modals/Modal";
import CreateNewProjectModalContent from "../modalContents/CreateNewProjectModalContent";
import {ListItem} from "../../../../types/components/ListsComponents";
import {useSortProjects} from "../../hooks/useSortProjects";
import {useListItems} from "../../../../hooks/useListItems";

const ProjectsAdd = memo(() => {

    const [showModal, setShowModal] = useState(false);

    //context values
    const [sort] = useSortProjects();
    const [{isOver}, {setItems: setProjects}] = useListItems();

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

        if(sort === 'newest') {

            setProjects(prevState => [project, ...prevState]);
            return;

        }

        if(sort === 'oldest' && isOver) setProjects(prevState => [...prevState, project]);

    }

});

export default ProjectsAdd;