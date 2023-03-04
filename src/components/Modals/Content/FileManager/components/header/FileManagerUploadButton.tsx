import React, {ChangeEvent, useEffect, useRef} from 'react';
import UploadFileIcon from "../../../../../Icons/KalaiIcons/UploadFileIcon";
import {useFileManager} from "../../../../../../hooks/useFileManager";

const FileManagerUploadButton = () => {

    const [fileManagerData, setFileManagerData] = useFileManager();

    const inputFileRef = useRef<null|HTMLInputElement>(null);

    useEffect(() => {

        if(inputFileRef.current) {

            setFileManagerData(prevData => ({...prevData, inputFileRef: inputFileRef}));
        }

    }, [inputFileRef.current]);


    return (
        <label className='kalaiIconDark no_stroke'>
            <UploadFileIcon />
            <input
                ref={inputFileRef}
                style={{display: 'none'}}
                type="file"
                accept='image/png, image/jpg, image/jpeg, image/webp, image/svg, image/gif, video/mp4'
                multiple
                onChange={prepareFiles}/>
        </label>
    );

    function prepareFiles(event: ChangeEvent<HTMLInputElement>) {

        if(!event.target?.files) {

            alert('You didn\'t choose any file');

            return;
        }

        setFileManagerData({...fileManagerData, uploadedFiles: event.target.files});

    }

};

export default FileManagerUploadButton;