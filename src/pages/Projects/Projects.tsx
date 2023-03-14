import React, {useState} from 'react';
import TinyInput from "../../components/UI/Input/TinyInput";
import FilterIcon from "../../components/Icons/KalaiIcons/FilterIcon";
import SortIcon from "../../components/Icons/KalaiIcons/SortIcon";
import AddCircleIcon from "../../components/Icons/KalaiIcons/AddCircleIcon";
import Modal from "../../components/Modals/Modal";



const Projects = () => {

    const [searchValue, setSearchValue] = useState('');
    const [showModal, setShowModal] = useState(false);

    return (
        <div className='main'>
            <div className="main__header flex flex-wrap flex-a-c w-100 mt-20px mb-10px pl-20px pr-20px pt-10px pb-10px">
                <div className='flex mr-20px'>
                    <div className="kalaiIcon-container flex">
                        <div onClick={() => {setShowModal(true)}} className='kalaiIcon--box'>
                            <AddCircleIcon />
                        </div>
                        <div className='kalaiIcon--box'>
                            <FilterIcon />
                        </div>
                        <div className='kalaiIcon--box'>
                            <SortIcon />
                        </div>
                    </div>

                </div>
                <div className='w-350px ml-auto'>
                    <TinyInput placeholder='Search...' value={searchValue} setValue={setSearchValue} />
                </div>
            </div>
            <Modal title='Create a new project' value={showModal} setValue={setShowModal}>
                <>f</>
            </Modal>
        </div>
    );
};

export default Projects;