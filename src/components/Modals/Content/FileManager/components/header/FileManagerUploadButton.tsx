import React, {ChangeEvent, useEffect, useRef} from 'react';
import UploadFileIcon from "../../../../../Icons/KalaiIcons/UploadFileIcon";
import {useFileManager} from "../../../../../../hooks/contextHooks/useFileManager";

const FileManagerUploadButton = () => {

    const [fileManagerData, setFileManagerData] = useFileManager();

    const inputFileRef = useRef<null|HTMLInputElement>(null);

    // setting the input ref in the fileManager context to transfer files from other components
    useEffect(() => {

        if(!inputFileRef.current) return;

        setFileManagerData(prevData => ({...prevData, inputFileRef: inputFileRef}));

    }, [inputFileRef.current]);


    return (
        <label className='kalaiIcon--box no_stroke'>
            <UploadFileIcon />
            <input
                ref={inputFileRef}
                style={{display: 'none'}}
                type="file"
                accept='image/png, image/jpg, image/jpeg, image/webp, image/svg+xml, image/gif, video/mp4'
                multiple
                onChange={prepareFiles}/>
        </label>
    );

    function prepareFiles(event: ChangeEvent<HTMLInputElement>) {

        if(!event.target?.files) return;

        setFileManagerData({...fileManagerData, uploadedFiles: event.target.files});

    }

};

export default FileManagerUploadButton;