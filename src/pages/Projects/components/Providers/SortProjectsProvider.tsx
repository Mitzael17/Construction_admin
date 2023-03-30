import React, {useState} from 'react';
import {SortProjectsChangeContext, SortProjectsContext } from '../../context/SortProjectsContext';
import {SortProjectsValues} from "../../types";

const SortProjectsProvider = ({children}: {children: JSX.Element}) => {

    const [sort, setSort] = useState<SortProjectsValues>('newest');

    return (
        <SortProjectsContext.Provider value={sort}>
            <SortProjectsChangeContext.Provider value={setSort}>
                {children}
            </SortProjectsChangeContext.Provider>
        </SortProjectsContext.Provider>
    );
};

export default SortProjectsProvider;