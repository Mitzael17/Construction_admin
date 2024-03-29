import React, {FormEvent, useState} from 'react';
import {useFileManagerContext} from "../../../../../../hooks/contextHooks/useFileManagerContext";
import TinyInput from "../../../../../UI/Input/TinyInput";
import SearchIcon from "../../../../../Icons/KalaiIcons/SearchIcon";

const FileManagerSearch = () => {

    const [fileManagerData, setFileManagerData] = useFileManagerContext();
    const [searchValue, setSearchValue] = useState('');

    return (
        <form onSubmit={filterData} className='flex w-100'>
            <TinyInput placeholder='Search...' value={searchValue} setValue={setSearchValue} />
            <button className='kalaiIcon--box'><SearchIcon /></button>
        </form>
    );

    function filterData(event: FormEvent) {

        event.preventDefault();

        const searchValueInLowerCase = searchValue.toLowerCase();

        const filteredData = {

            directories: fileManagerData.data.directories.filter(
                (name) => name.toLowerCase().match(searchValueInLowerCase)
            ),

            files: fileManagerData.data.files.filter(
                ( {name} ) => name.toLowerCase().match(searchValueInLowerCase)
            )

        };

        setFileManagerData({...fileManagerData, filteredData: filteredData});

    }

};

export default FileManagerSearch;