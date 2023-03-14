import React from 'react';
import {$deleteFiles} from "../../../../../../api/filesAPI";
import DeleteIcon from "../../../../../Icons/KalaiIcons/DeleteIcon";
import {useFileManager} from "../../../../../../hooks/useFileManager";
import {Statuses} from "../../../../../../types/API";

const FileManagerDeleteButton = () => {

    const [fileManagerData, setFileManagerData] = useFileManager();
    const directory = fileManagerData.arrDirectories.join('/')  + '/';

    return (
        <div onClick={handlerClick} className='kalaiIcon--box'>
            <DeleteIcon />
        </div>
    );

    async function handlerClick() {

        if(fileManagerData.checkedNames.length === 0) return;

        setFileManagerData({...fileManagerData, isLoading: true});

        const response = await $deleteFiles(fileManagerData.checkedNames);


        if(response.status !== Statuses.success) {

            setFileManagerData({...fileManagerData, isLoading: false});

            alert(response.status);

            return;

        }

        // cleaning initial data from deleted directories and files
        const data = {
            files: fileManagerData.data.files.filter(
                ({name}) => fileManagerData.checkedNames.indexOf(directory + name) === -1
            ),
            directories: fileManagerData.data.directories.filter(
                name => fileManagerData.checkedNames.indexOf(directory + name) === -1
            )
        };

        setFileManagerData({
            ...fileManagerData,
            data: data,
            filteredData: data,
            checkedNames: [],
            isLoading: false
        });

    }

};

export default FileManagerDeleteButton;