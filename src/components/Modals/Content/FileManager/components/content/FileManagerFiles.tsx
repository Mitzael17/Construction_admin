import React, {ChangeEvent, memo} from 'react';
import classes from "../../FileManager.module.scss";
import {FileManagerFilesListProps} from "../../../../../../types/components/ModalsComponents";
import CheckBox from "../../../../../UI/CheckBox/CheckBox";
import fileImage from "../../../../../../assets/file.png";

const FileManagerFiles = memo(({setImage, files, directory, setCheckedNames, hideFileManager}: FileManagerFilesListProps) => {

    return (
        <>
            {files.map(file => (
                <div
                    title={file.name}
                    key={file.link}
                    className={classes.item}
                    onDoubleClick={() => {

                        setImage({
                            inner_link: directory + file.name,
                            out_link: file.link
                        });

                        hideFileManager();

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

        if(event.target.checked) setCheckedNames(prev => [...prev, event.target.name]);
        else setCheckedNames(prev => prev.filter(name => name !== event.target.name))

    }

});

export default FileManagerFiles;