import React, {FormEvent, useEffect, useRef, useState} from 'react';
import AddFolderIcon from "../../../../../Icons/KalaiIcons/AddFolderIcon";
import TinyInput from "../../../../../UI/Input/TinyInput";
import {$checkFileNames, $createFolder} from "../../../../../../api/filesAPI";
import {Statuses} from "../../../../../../types/API";
import {useFileManager} from "../../../../../../hooks/useFileManager";
import CheckIcon from "../../../../../Icons/KalaiIcons/CheckIcon";
import classes from "../../FileManager.module.scss";
import Loading from "../../../../../Visual/Loading";

const FileManagerAddFolderButton = () => {

    const [fileManagerData, setFileManagerData] = useFileManager();

    const directory = fileManagerData.arrDirectories.join('/')  + '/';

    const [showNewFolderInput, setShowNewFolderInput] = useState(false);

    const [newDirectoryName, setNewDirectoryName] = useState('');
    const [isUniqueName, setIsUniqueName] = useState(false);

    // loading for async validation
    const [isLoading, setIsLoading] = useState(false);
    
    const inputRef = useRef<HTMLInputElement>(null);

    // The async checking of the directory name for uniqueness
    useEffect(() => {

        let ignore = false;

        const timer = setTimeout(async () => {

            setIsLoading(true);

            const response = await $checkFileNames([newDirectoryName], directory);

            if(ignore) return;


            setIsLoading(false);

            if(response.status === Statuses.success) {

                setIsUniqueName(true);

                return;

            }

            setIsUniqueName(false);

        }, 500);

        return () => {
            clearTimeout(timer);
            ignore = true;
        };


    }, [newDirectoryName]);

    return (
        <>
            <div onClick={toggleVisibleStatus} className='kalaiIconDark'>
                <AddFolderIcon />
            </div>
            <form
                onSubmit={addFolder}
                style={{display: showNewFolderInput ? 'flex' : 'none'}}
                className={`${classes.folderInput} flex ${ !isLoading ? (isUniqueName ? 'success-input' : 'error-input') : ''}`}
                onClick={(event) => event.stopPropagation()}
            >
                <TinyInput ref={inputRef} placeholder='Name of directory' value={newDirectoryName} setValue={setNewDirectoryName} />
                <button disabled={isLoading || !isUniqueName || fileManagerData.isLoading} className='kalaiIconDark'>
                    {isLoading || fileManagerData.isLoading ? <Loading diameter={10} showText={false} /> : <CheckIcon />}
                </button>
            </form>
        </>

    );

    function toggleVisibleStatus() {

        setShowNewFolderInput(prev => !prev);

        if(showNewFolderInput) return;

        setTimeout( () => {

            inputRef.current?.focus();

        }, 10);

    }

    async function addFolder(event: FormEvent) {

        event.preventDefault();

        if(!isUniqueName || isLoading || fileManagerData.isLoading) return;

        setFileManagerData({...fileManagerData, isLoading: true});

        const response = await $createFolder(directory + newDirectoryName);

        setFileManagerData({...fileManagerData, isLoading: false});


        if(response.status === Statuses.success) {

            const directories = [...fileManagerData.data.directories, newDirectoryName]

            setFileManagerData({
                ...fileManagerData,
                data: {
                    ...fileManagerData.data,
                    directories: directories
                },
                filteredData: {
                    ...fileManagerData.filteredData,
                    directories: directories
                }});

            setNewDirectoryName('');
            setShowNewFolderInput(false);

            return;

        }

        alert(response.status);


    }

};

export default FileManagerAddFolderButton;