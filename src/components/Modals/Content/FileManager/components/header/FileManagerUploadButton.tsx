import React, {ChangeEvent, useEffect, useRef} from 'react';
import UploadFileIcon from "../../../../../Icons/KalaiIcons/UploadFileIcon";
import {$uploadFiles} from "../../../../../../api/filesAPI";
import {useFileManager} from "../../../../../../hooks/useFileManager";

const FileManagerUploadButton = () => {

    const [fileManagerData, setFileManagerData] = useFileManager();

    const inputFileRef = useRef<null|HTMLInputElement>(null);
    const directory = fileManagerData.arrDirectories.join('/') + '/';

    useEffect(() => {

        if(inputFileRef.current) {

            setFileManagerData(prevData => ({...prevData, inputFileRef: inputFileRef}));
        }

    }, [inputFileRef.current]);


    return (
        <label className='kalaiIconDark no_stroke'>
            <UploadFileIcon />
            <input ref={inputFileRef} style={{display: 'none'}} type="file" multiple onChange={uploadFile}/>
        </label>
    );

    async function uploadFile(event: ChangeEvent<HTMLInputElement>) {

        if(!event.target?.files) alert('You didn\'t choose any file');

        const data = await $uploadFiles(event.target.files as FileList, directory);

        alert(data.status);

    }

};

export default FileManagerUploadButton;