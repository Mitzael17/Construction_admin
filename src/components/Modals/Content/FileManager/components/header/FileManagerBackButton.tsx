import React from 'react';
import BendArrowLeftIcon from "../../../../../Icons/KalaiIcons/BendArrowLeftIcon";
import {useFileManagerContext} from "../../../../../../hooks/contextHooks/useFileManagerContext";
import {useModalContext} from "../../../../../../hooks/contextHooks/useModalContext";

const FileManagerBackButton = () => {

    const [fileManagerData, setFileManagerData] = useFileManagerContext();
    const [, setModalData] = useModalContext();

    return (
        <div onClick={handlerClick} className='kalaiIcon--box'>
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