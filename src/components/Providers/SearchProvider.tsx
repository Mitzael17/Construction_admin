import React, {useState} from 'react';
import {SearchChangeContext, SearchContext} from "../../context/SearchContext";

const SearchProvider = ({children}: {children: JSX.Element}) => {

    const [search, setSearch] = useState('');

    return (
        <SearchContext.Provider value={search}>
            <SearchChangeContext.Provider value={setSearch}>
                {children}
            </SearchChangeContext.Provider>
        </SearchContext.Provider>
    );
};

export default SearchProvider;