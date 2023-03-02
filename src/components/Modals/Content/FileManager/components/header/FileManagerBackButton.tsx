import React, {memo} from 'react';
import BendArrowLeftIcon from "../../../../../Icons/KalaiIcons/BendArrowLeftIcon";
import {useFileManager} from "../../../../../../hooks/useFileManager";
import {useModal} from "../../../../../../hooks/useModal";

const FileManagerBackButton = memo(() => {

    const [fileManagerData, setFileManagerData] = useFileManager();
    const [, setModalData] = useModal();

    const directory = fileManagerData.arrDirectories.join('/') + '/';

    return (
        <div onClick={handleClick} className='kalaiIconDark'>
            <BendArrowLeftIcon />
        </div>
    );

    function handleClick() {

        if(!directory || directory === '/') {

            fileManagerData.setVisible(false);
            if(fileManagerData.prevTitle) setModalData({title: fileManagerData.prevTitle});
            return;

        }

        const newArrDirectories = JSON.parse(JSON.stringify(fileManagerData.arrDirectories));

        newArrDirectories.pop();

        setFileManagerData({...fileManagerData, arrDirectories: newArrDirectories, isLoading: true});

    }

});

export default FileManagerBackButton;