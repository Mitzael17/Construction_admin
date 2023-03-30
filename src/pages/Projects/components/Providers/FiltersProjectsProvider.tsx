import React, {useState} from 'react';
import {BaseData} from "../../../../types/API";
import {FiltersProjectsChangeContext, FiltersProjectsContext } from '../../context/FiltersProjectsContext';

const FiltersProjectsProvider = ({children}: {children: JSX.Element}) => {

    const [filterClients, setFilterClients] = useState<BaseData[]>([]);
    const [filterStatuses, setFilterStatuses] = useState<BaseData[]>([]);
    const [filterServices, setFilterServices] = useState<BaseData[]>([]);

    return (
        <FiltersProjectsContext.Provider value={{
            filterStatuses,
            filterServices,
            filterClients,
        }}>
            <FiltersProjectsChangeContext.Provider value={{
                setFilterClients,
                setFilterServices,
                setFilterStatuses
            }}>
                {children}
            </FiltersProjectsChangeContext.Provider>
        </FiltersProjectsContext.Provider>
    );
};

export default FiltersProjectsProvider;