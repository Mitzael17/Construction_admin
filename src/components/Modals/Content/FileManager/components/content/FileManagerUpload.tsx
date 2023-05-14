import React, {useEffect, useReducer, useState} from 'react';
import {useFileManagerContext} from "../../../../../../hooks/contextHooks/useFileManagerContext";
import classes from "../../FileManager.module.scss";
import {FilePreview, FileReducerAction} from "../../../../../../types/components/ModalsComponents";
import fileImage from "../../../../../../assets/icons/File.svg";
import Loading from "../../../../../Visual/Loading";
import TinyInput from "../../../../../UI/Input/TinyInput";
import CheckBox from "../../../../../UI/CheckBox/CheckBox";
import Button from "../../../../../UI/Button/Button";
import {$checkFileNames, $uploadFiles} from "../../../../../../api/filesAPI";
import {Statuses} from "../../../../../../types/API";
import {renameFile} from "../../../../../../utils/files";

const FileManagerUpload = () => {

    const [fileManagerData, setFileManagerData] = useFileManagerContext();

    if(!fileManagerData.uploadedFiles) throw new Error('Files weren\'t provided');

    const [files, dispatchFiles] = useReducer(filesReducer, []);
    const [autoRenameMode, setAutoRenameMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const directory = fileManagerData.arrDirectories.join('/') + '/';

    const [uniqueNames, setUniqueNames] = useState<string[]>([]);
    const [loadingNames, setLoadingNames] = useState<string[]>([]);

    const duplicatedClass = autoRenameMode ? 'warning-input' : 'error-input';

    const isAvailableToSubmit = (files.length === uniqueNames.length || autoRenameMode) && !loadingNames.length;

    // The checking file names
    useEffect(() => {

        // close the window if all files are removed
        if(!files.length && !isLoading) {

            setFileManagerData(prevData => ({...prevData, uploadedFiles: null}));

            return;

        }

        let ignore = false;

        // The async checking of file names for uniqueness
        const timer = setTimeout( async () => {

            const names = files.map( file => file.name + file.extension);

            const sameNames: string[] = [];
            const changedNames: string[] = [];

            names.forEach( name => {

                if(uniqueNames.indexOf(name) === -1) changedNames.push(name);
                else sameNames.push(name);

            });

            setUniqueNames(sameNames);
            setLoadingNames(changedNames);

            const response = await $checkFileNames(names, directory);

            if(ignore) return;

            if(response.status === Statuses.success) {

                // skip files, which don't have a name to create an error/warning
                setUniqueNames(names.filter(name => !name.trim().match(/^\.\w+$/)));
                setLoadingNames([]);

                return;

            }

            // skip files, which don't have a name or files, which name is busy to create an error/warning
            setUniqueNames(names.filter( name => response.busy_names.indexOf(name) === -1 && !name.trim().match(/^\.\w+$/)));
            setLoadingNames([]);

        }, 500);


        return () => {
            clearTimeout(timer);
            ignore = true;
        };

    }, [files]);

    // The initialization of files after uploading (creating preview, preparation of another information for the layout)
    useEffect(() => {

        if(!fileManagerData.uploadedFiles) throw new Error('Files weren\'t provided');

        const bufferFiles: FilePreview[] = [];
        let quantityLoadedFiles = 0;

        const pushBuffer = (preview: string, index: number): void => {

            if(!fileManagerData.uploadedFiles || !fileManagerData.uploadedFiles[index]) return;

            let name = fileManagerData.uploadedFiles[index].name;
            const extension = name.substring(name.lastIndexOf('.'));

            name = name.replace(new RegExp(`${extension}$`), '');

            bufferFiles.push({
                id: index,
                preview: preview,
                fileData: fileManagerData.uploadedFiles[index],
                name: name,
                extension: extension
            });


            if(quantityLoadedFiles === fileManagerData.uploadedFiles.length) {

                dispatchFiles({type: 'set', data: bufferFiles});

                setIsLoading(false);

            }

        }

        [...fileManagerData.uploadedFiles].forEach( (file, index) => {

            if(!file.type.match(/^image/)) {

                quantityLoadedFiles++;

                pushBuffer(fileImage, index);

                return;

            }

            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = event => {

                let result = event.target?.result;

                result = typeof result === 'string' ? result : `${fileImage}`;

                quantityLoadedFiles++;

                pushBuffer(result, index);

            }

        });

    }, []);

    return (
        <>
            <div className={`${classes.header} flex-a-c`}>
                <div>
                    <CheckBox
                        placeholder='Auto rename mode'
                        onChange={ event => { setAutoRenameMode(event.target.checked); }}
                        checked={autoRenameMode}
                    />
                </div>
                <div>
                    <Button disabled={!isAvailableToSubmit} onClick={uploadFile}>
                        {loadingNames.length ? <Loading showText={false} diameter={20} /> : 'Save'}
                    </Button>
                </div>
            </div>
            <div className={classes.content}>
                {!isLoading ?
                    <>
                        {files.map( file => (
                            <div key={file.id} className={`${classes.item} default-cursor`}>
                                <div className={classes.imageContainer}>
                                    <img draggable={false} src={file.preview} alt={file.name} />
                                </div>
                                <div
                                    className={`w-100 
                                    ${loadingNames.indexOf(file.name + file.extension) === -1 
                                    && (uniqueNames.indexOf(file.name + file.extension) !== -1 ? 'success-input' : duplicatedClass)}
                                    `}>
                                    <div
                                        onClick={() => { dispatchFiles({type: 'delete', data: file}); }}
                                        className='delete-button center-x mb-10px'
                                    ></div>
                                    <TinyInput
                                        placeholder='Write file name'
                                        value={file.name}
                                        setValue={(name: string) => { dispatchFiles({type: 'change', data: {...file, name} }); }}
                                    />
                                </div>
                            </div>
                        ))}
                    </>
                    : <div className='pos-abs-center'><Loading /></div>
                }
            </div>
        </>
    );

    function filesReducer(files: FilePreview[], action: FileReducerAction) {

        switch (action.type) {

            case 'set': {
                return action.data;
            }
            case 'change': {
                return files.map( file => {

                    if(file.id !== action.data.id) return file;

                    return action.data;

                })
            }
            case 'delete': {
                return files.filter( file => file.id !== action.data.id);
            }

        }

    }

    async function uploadFile() {

        if(!files.length) {

            alert('You didn\'t choose any file');

            return;
        }

        if(!isAvailableToSubmit || isLoading) return false;

        setIsLoading(true);

        const ready_files = files.map( file => {

            if(file.name + file.extension === file.fileData.name) return file.fileData;

            const name = file.name ? file.name : new Date().getTime() / 1000 + (Math.random() * 10000).toFixed(0);

            return renameFile(file.fileData, name + file.extension);

        });

        const response = await $uploadFiles(ready_files, directory, autoRenameMode);

        if(response.status === Statuses.success) {

            // add new files to old ones and clean uploadedFiles
            setFileManagerData(prevData => (
                {
                    ...prevData,
                    isLoading: false,
                    data: {...prevData.data, files: [...response.files, ...prevData.data.files]},
                    filteredData: {...prevData.data, files: [...response.files, ...prevData.data.files]},
                    uploadedFiles: null,
                })
            );

            return;

        }

        alert(response.status ?? 'One or more files can\'t be uploaded');
        
        setIsLoading(false);

        return;

    }

};

export default FileManagerUpload;