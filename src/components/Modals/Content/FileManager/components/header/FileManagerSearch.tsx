import React, {FormEvent} from 'react';
import {useStateCallback} from "../../../../../../hooks/useStateCallback";
import {useFileManager} from "../../../../../../hooks/useFileManager";
import TinyInput from "../../../../../UI/Input/TinyInput";
import SearchIcon from "../../../../../Icons/KalaiIcons/SearchIcon";

const FileManagerSearch = () => {

    const [fileManagerData, setFileManagerData] = useFileManager();
    const [searchValue, setSearchValue] = useStateCallback('', (state) => {

        return state.toLowerCase();

    });

    return (
        <form onSubmit={filterData} className='flex w-100'>
            <TinyInput placeholder='Search...' value={searchValue} setValue={setSearchValue} />
            <button className='kalaiIconDark'><SearchIcon /></button>
        </form>
    );

    function filterData(event: FormEvent) {

        event.preventDefault();

        if(fileManagerData.data) {

            const filteredData = {
                directories: fileManagerData.data.directories.filter( (name) => name.toLowerCase().match(searchValue) ),
                files: fileManagerData.data.files.filter( ( {name} ) => name.toLowerCase().match(searchValue))
            };

            setFileManagerData({...fileManagerData, filteredData: filteredData});

        }

    }

};

export default FileManagerSearch;