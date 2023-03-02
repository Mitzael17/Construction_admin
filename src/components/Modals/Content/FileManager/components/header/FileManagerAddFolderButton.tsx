import React, {useState} from 'react';
import AddFolderIcon from "../../../../../Icons/KalaiIcons/AddFolderIcon";
import TinyInput from "../../../../../UI/Input/TinyInput";
import Button from "../../../../../UI/Button/Button";
import {$createFolder} from "../../../../../../api/filesAPI";
import {Statuses} from "../../../../../../types/API";
import {useFileManager} from "../../../../../../hooks/useFileManager";

const FileManagerAddFolderButton = () => {

    const [fileManagerData, setFileManagerData] = useFileManager();

    const directory = fileManagerData.arrDirectories.join('/')  + '/';

    const [showNewFolderInput, setShowNewFolderInput] = useState(false);
    const [newDirectoryName, setNewDirectoryName] = useState('');

    return (
        <div onClick={() => setShowNewFolderInput(prev => !prev)} className='kalaiIconDark'>
            <AddFolderIcon />
            {showNewFolderInput && (
                <div onClick={(event) => event.stopPropagation()}>
                    <TinyInput placeholder='Name of directory' value={newDirectoryName} setValue={setNewDirectoryName} />
                    <Button type='button' onClick={addFolder}>Ok</Button>
                </div>
            )}
        </div>
    );

    async function addFolder() {

        setFileManagerData({...fileManagerData, isLoading: true});

        const response = await $createFolder(directory + newDirectoryName);

        setFileManagerData({...fileManagerData, isLoading: false});

        if(response.status === Statuses.success) {

            if(fileManagerData.data) {

                fileManagerData.data.directories.push(newDirectoryName);

                setFileManagerData({
                    ...fileManagerData,
                    filteredData: {...fileManagerData.filteredData,
                        directories: fileManagerData.data.directories
                    }});

                return;

            }

            alert(response.status);

        }

    }

};

export default FileManagerAddFolderButton;