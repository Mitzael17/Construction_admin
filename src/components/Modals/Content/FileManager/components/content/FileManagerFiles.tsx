import React, {ChangeEvent} from 'react';
import classes from "../../FileManager.module.scss";
import {useFileManager} from "../../../../../../hooks/useFileManager";
import {FileManagerProps} from "../../../../../../types/components/ModalsComponents";
import CheckBox from "../../../../../UI/CheckBox/CheckBox";
import fileImage from "../../../../../../assets/file.png";

const FileManagerFiles = ({setImage}: Pick<FileManagerProps, 'setImage'>) => {

    const [fileManagerData, setFileManagerData] = useFileManager();
    const directory = fileManagerData.arrDirectories.join('/') + '/';


    return (
        <>
            {fileManagerData.filteredData.files.map(file => (
                <div
                    title={file.name}
                    key={file.link}
                    className={classes.item}
                    onDoubleClick={() => {

                        fileManagerData.setVisible(false);

                        setImage({
                            inner_link: directory + file.name,
                            out_link: file.link
                        });

                    }}
                >
                    <div className={classes.imageContainer}>
                        <img src={file.isImage ? file.link : fileImage} alt={file.name} />
                    </div>
                    <div className="flex flex-j-c">
                        <CheckBox onChange={handlerChange} name={directory + file.name} />
                    </div>
                    <div className={classes.name}>
                        { file.name.length > 12 ? file.name.slice(0, 12) + '...' : file.name }
                    </div>
                </div>
            ))}
        </>
    );


    function handlerChange(event: ChangeEvent<HTMLInputElement>) {

        if(event.target.checked) {

            setFileManagerData({
                ...fileManagerData,
                checkedNames: [...fileManagerData.checkedNames, event.target.name]
            });

        } else {

            setFileManagerData({
                ...fileManagerData,
                checkedNames: fileManagerData.checkedNames.filter(name => name !== event.target.name)
            });

        }

    }

};

export default FileManagerFiles;