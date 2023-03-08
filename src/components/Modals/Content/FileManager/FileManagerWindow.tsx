import React, {memo, useEffect} from 'react';
import {FilesResponse} from "../../../../types/API/files";
import {$getFiles} from "../../../../api/filesAPI";
import {ErrorResponse} from "../../../../types/API";
import {FileManagerProps} from "../../../../types/components/ModalsComponents";
import {useModal} from "../../../../hooks/useModal";
import {useFileManager} from "../../../../hooks/useFileManager";
import FileManagerHeader from "./components/FileManagerHeader";
import FileManagerContent from "./components/FileManagerContent";
import FileManagerUpload from "./components/content/FileManagerUpload";

const FileManagerWindow = memo(({setImage}: Omit<FileManagerProps, 'setVisible'|'prevTitle'>) => {

    const [, setModalData] = useModal();
    const [fileManagerData, setFileManagerData] = useFileManager();

    const directory = fileManagerData.arrDirectories.join('/') + '/';

    useEffect(() => {

        setModalData({
            title: 'File manager',
            onExit: () => {

                if(typeof fileManagerData.prevTitle === 'string') {
                    setModalData({title: fileManagerData.prevTitle});
                }

            }});

    }, [])

    useEffect( () => {

        let ignore  = false;

        (async function() {

            setFileManagerData(prevData => ({...prevData, data: {
                directories: [],
                files: []
            }}));

            const response = await $getFiles(directory);

            if(!ignore) {

                if((response as ErrorResponse)?.status) {

                    alert((response as ErrorResponse).message);

                } else {

                    setFileManagerData(prevData => ({...prevData,
                        data: response as FilesResponse,
                        filteredData: response as FilesResponse,
                        isLoading: false
                    }))

                }

            }

        })();

        return () => {ignore = true};

    }, [fileManagerData.arrDirectories]);

    return (
        <>
            {!fileManagerData.uploadedFiles?.length ?
                <>
                    <FileManagerHeader />
                    <FileManagerContent setImage={setImage} />
                </>
                : <FileManagerUpload />
            }
        </>
    );

});

export default FileManagerWindow;