import React, {useState} from 'react';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";



const Projects = () => {

    const [searchValue, setSearchValue] = useState('');

    return (
        <div className='main'>
            <div className="main__header flex flex-a-c w-100 mb-10px pl-20px pr-20px pt-10px pb-10px">
                <div>
                    <Button theme='light'>Add project</Button>
                </div>
                <div className='w-500px ml-auto'>
                    <Input placeholder='Search...' value={searchValue} setValue={setSearchValue} />
                </div>
            </div>
        </div>
    );
};

export default Projects;