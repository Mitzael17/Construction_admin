import React from 'react';
import {$deleteFiles} from "../../../../../../api/filesAPI";
import DeleteIcon from "../../../../../Icons/KalaiIcons/DeleteIcon";
import {useFileManager} from "../../../../../../hooks/useFileManager";

const FileManagerDeleteButton = () => {

    const [fileManagerData, setFileManagerData] = useFileManager();
    const directory = fileManagerData.arrDirectories.join('/')  + '/';

    return (
        <div onClick={handleClick} className='kalaiIconDark'>
            <DeleteIcon />
        </div>
    );

    async function handleClick() {

        if(fileManagerData.checkedNames.length < 1) return;

        setFileManagerData({...fileManagerData, isLoading: true});

        const response = await $deleteFiles(fileManagerData.checkedNames);

        if(fileManagerData.data) {

            const data = {
                files: fileManagerData.data.files.filter( ({name}) => fileManagerData.checkedNames.indexOf(directory + name) === -1),
                directories: fileManagerData.data.directories.filter( name => fileManagerData.checkedNames.indexOf(directory + name) === -1)
            };

            setFileManagerData({...fileManagerData, data: data, filteredData: data, isLoading: false});

            return;

        }

        setFileManagerData({...fileManagerData, isLoading: false});

    }

};

export default FileManagerDeleteButton;