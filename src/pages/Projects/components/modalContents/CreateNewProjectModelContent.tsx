import React, {useState} from 'react';
import {useModal} from "../../../../hooks/useModal";

const CreateNewProjectModelContent = () => {

    const [modalData, setModalData] = useModal();

    const [name, setName] = useState('');
    const [clientId, setClientId] = useState(0);
    const [serviceId, setServiceId] = useState(0);
    const [projectStatusId, setProjectStatusId] = useState(0);



    return (
        <form action='#' className='defaultForm'>

        </form>
    );
};

export default CreateNewProjectModelContent;