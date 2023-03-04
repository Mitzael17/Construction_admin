import React, {ChangeEvent} from 'react';
import classes from "../../FileManager.module.scss";
import {useFileManager} from "../../../../../../hooks/useFileManager";
import {FileManagerProps} from "../../../../../../types/components/ModalsComponents";
import CheckBox from "../../../../../UI/CheckBox/CheckBox";

const FileManagerImages = ({setImage}: Pick<FileManagerProps, 'setImage'>) => {

    const [fileManagerData, setFileManagerData] = useFileManager();
    const directory = fileManagerData.arrDirectories.join('/') + '/';


    return (
        <>
            {fileManagerData.filteredData.files.map(file => (
                <div key={file.link} onDoubleClick={() => {

                    fileManagerData.setVisible(false);
                    setImage({
                        inner_link: directory + file.name,
                        out_link: file.link
                    });

                }} className={classes.item}>
                    <div className={classes.imageContainer}>
                        <img src={file.link} alt={file.name} />
                    </div>
                    <div className="flex flex-j-c">
                        <CheckBox onChange={handlerChange} name={directory + file.name} />
                    </div>
                    <div className={classes.name}>{file.name}</div>
                </div>
            ))}
        </>
    );

    function handlerChange(event: ChangeEvent<HTMLInputElement>) {

        if(event.target.checked) {

            setFileManagerData({...fileManagerData, checkedNames: [...fileManagerData.checkedNames, event.target.name]});

        } else {

            setFileManagerData({...fileManagerData, checkedNames: fileManagerData.checkedNames.filter(name => name !== event.target.name)});

        }

    }

};

export default FileManagerImages;