import React, {memo, useRef, useState} from 'react';
import DeleteIcon from "../../../../components/Icons/KalaiIcons/DeleteIcon";
import {$deleteProject} from "../../../../api/projectsAPI";
import {ReducerTypes} from "../../../../types";
import {PostResponse, Statuses} from "../../../../types/API";
import Modal from "../../../../components/Modals/Modal";
import StatusResponse from "../../../../components/Visual/StatusResponse";
import {useCheckedItems} from "../../../../hooks/contextHooks/useCheckedItems";
import {useListItems} from "../../../../hooks/contextHooks/useListItems";
import Loading from "../../../../components/Visual/Loading";
import {createPortal} from "react-dom";

const ProjectsDelete = memo(() => {

    const [deleteLoading, setDeleteLoading] = useState(false);
    const deleteResponse = useRef<PostResponse>();

    const [showModal, setShowModal] = useState(false);

    const buttonRef = useRef<HTMLDivElement>(null);

    // Context values
    const [checkedProjects, dispatchCheckedProjects] = useCheckedItems();
    const [, {setItems: setProjects}] = useListItems();


    return (
        <>
            <div className='kalaiIcon--box' ref={buttonRef} onClick={deleteProjects}>
                <DeleteIcon />
            </div>
            <Modal title='Response' value={showModal} setValue={setShowModal}>
                {deleteResponse.current ? <StatusResponse response={deleteResponse.current} />: <></>}
            </Modal>
            {buttonRef.current && deleteLoading && createPortal(
                <div className='ml-15px flex flex-a-c'><Loading diameter={20} showText={false} /></div>
                , (buttonRef.current.parentElement as HTMLDivElement).parentElement as HTMLDivElement)
            }
        </>

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

        const removedProjects = response.arr_id !== undefined
            ? checkedProjects.filter( id => (response.arr_id as number[]).indexOf(+id) === -1)
            : checkedProjects;

        setProjects(prevState => prevState.filter(item => removedProjects.indexOf(`${item.id}`) === -1));

        deleteResponse.current = response;
        setShowModal(true);

    }

});

export default ProjectsDelete;