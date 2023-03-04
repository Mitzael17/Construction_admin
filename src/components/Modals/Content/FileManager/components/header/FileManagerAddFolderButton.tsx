import React, {FormEvent, FormEventHandler, useRef, useState} from 'react';
import AddFolderIcon from "../../../../../Icons/KalaiIcons/AddFolderIcon";
import TinyInput from "../../../../../UI/Input/TinyInput";
import {$createFolder} from "../../../../../../api/filesAPI";
import {Statuses} from "../../../../../../types/API";
import {useFileManager} from "../../../../../../hooks/useFileManager";
import CheckIcon from "../../../../../Icons/KalaiIcons/CheckIcon";
import classes from "../../FileManager.module.scss";

const FileManagerAddFolderButton = () => {

    const [fileManagerData, setFileManagerData] = useFileManager();

    const directory = fileManagerData.arrDirectories.join('/')  + '/';

    const [showNewFolderInput, setShowNewFolderInput] = useState(false);
    const [newDirectoryName, setNewDirectoryName] = useState('');

    const inputRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState(false);

    return (
        <>
            <div onClick={() => {

                setShowNewFolderInput(prev => !prev);

                if(!showNewFolderInput) setTimeout( () => {inputRef.current?.focus()}, 10);

            }} className='kalaiIconDark'>
                <AddFolderIcon />
            </div>
            <form onSubmit={addFolder} style={{display: showNewFolderInput ? 'flex' : 'none'}} className={`${classes.folderInput} flex ${error ? 'error-input' : ''}`} onClick={(event) => event.stopPropagation()}>
                <TinyInput ref={inputRef} placeholder='Name of directory' value={newDirectoryName} setValue={setNewDirectoryName} />
                <button className='kalaiIconDark'>
                    <CheckIcon />
                </button>
            </form>
        </>

    );

    async function addFolder(event: FormEvent) {

        event.preventDefault();

        if(!newDirectoryName.trim()) {

            setError(true);

            return;

        }

        setFileManagerData({...fileManagerData, isLoading: true});
        setError(false);

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

                setNewDirectoryName('');
                setShowNewFolderInput(false);

                return;

            }

            alert(response.status);

        }

    }

};

export default FileManagerAddFolderButton;