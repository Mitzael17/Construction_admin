import React, {useState} from 'react';
import {SortChangeContext, SortContext} from "../../context/SortContext";

const SortProvider = ({defaultValue = '', children}: {defaultValue?: string, children: JSX.Element}) => {

    const [sort, setSort] = useState(defaultValue);

    return (
        <SortContext.Provider value={sort}>
            <SortChangeContext.Provider value={setSort}>
                {children}
            </SortChangeContext.Provider>
        </SortContext.Provider>
    );
};

export default SortProvider;