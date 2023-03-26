import React from 'react';
import {FilterProjectProps} from "../../../../types/components/ModalsComponents";
import SearchBox from "../../../../components/UI/SearchBox/SearchBox";
import ChosenValuesList from "../../../../components/Lists/ChosenValuesList/ChosenValuesList";

const FilterProjectModalContent = ({clients, statuses, setStatus, setClient, service, setService}: FilterProjectProps) => {

    return (
        <div>
            <div className='flex'>
                <div className='w-100 mr-15px'>
                    <SearchBox
                        placeholder='Search client...'
                        setChosenValue={setClient}
                        chosenValue={clients}
                        table='clients'
                    />
                    <div className='mt-15px mb-15px'>
                        <ChosenValuesList value={clients} setValue={setClient} />
                    </div>
                </div>
                <div className='w-100 mr-15px'>
                    <SearchBox
                        placeholder='Search status...'
                        setChosenValue={setStatus}
                        chosenValue={statuses}
                        table='project_status'
                    />
                    <div className='mt-15px mb-15px'>
                        <ChosenValuesList value={statuses} setValue={setStatus} />
                    </div>
                </div>
                <div className='w-100'>
                    <SearchBox
                        placeholder='Search service...'
                        setChosenValue={setService}
                        chosenValue={service}
                        table='services'
                    />
                    <div className='mt-15px mb-15px'>
                        <ChosenValuesList value={service} setValue={setService} />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default FilterProjectModalContent;