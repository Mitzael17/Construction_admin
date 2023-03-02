import React from 'react';
import SearchInput from "../../../../../UI/Input/SearchInput";
import {useStateCallback} from "../../../../../../hooks/useStateCallback";
import {useFileManager} from "../../../../../../hooks/useFileManager";

const FileManagerSearch = () => {

    const [fileManagerData, setFileManagerData] = useFileManager();
    const [searchValue, setSearchValue] = useStateCallback('', (state) => {

        return state.toLowerCase();

    });

    return (
        <SearchInput onClick={filterData} placeholder='Search...' value={searchValue} setValue={setSearchValue} />
    );

    function filterData(event: React.MouseEvent) {

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