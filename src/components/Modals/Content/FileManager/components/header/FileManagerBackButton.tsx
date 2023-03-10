import React from 'react';
import BendArrowLeftIcon from "../../../../../Icons/KalaiIcons/BendArrowLeftIcon";
import {useFileManager} from "../../../../../../hooks/useFileManager";
import {useModal} from "../../../../../../hooks/useModal";

const FileManagerBackButton = () => {

    const [fileManagerData, setFileManagerData] = useFileManager();
    const [, setModalData] = useModal();

    return (
        <div onClick={handlerClick} className='kalaiIconDark'>
            <BendArrowLeftIcon />
        </div>
    );

    function handlerClick() {

        if(fileManagerData.arrDirectories.length === 0) {

            fileManagerData.setVisible(false);

            if(fileManagerData.prevTitle) setModalData({title: fileManagerData.prevTitle});

            return;

        }

        setFileManagerData({
            ...fileManagerData,
            arrDirectories: fileManagerData.arrDirectories.slice(0, fileManagerData.arrDirectories.length - 1),
            isLoading: true
        });

    }

};

export default FileManagerBackButton;