import React, {ChangeEvent} from 'react';
import classes from "../../FileManager.module.scss";
import folder from "../../../../../../assets/folder.png";
import {useFileManager} from "../../../../../../hooks/useFileManager";
import CheckBox from "../../../../../UI/CheckBox/CheckBox";

const FileManagerDirectories = () => {

    const [fileManagerData, setFileManagerData] = useFileManager();

    const directory = fileManagerData.arrDirectories.join('/') + '/';

    return (
        <>
            {fileManagerData.filteredData.directories.map( dir => (
                <div key={dir} onDoubleClick={() => {

                    setFileManagerData({...fileManagerData, arrDirectories: [...fileManagerData.arrDirectories, dir], isLoading: true});

                }} className={classes.item}>
                    <div className={classes.imageContainer}>
                        <img src={folder} alt={dir}/>
                    </div>
                    <div className="flex flex-j-c">
                        <CheckBox name={directory + dir} onChange={handlerChange} />
                    </div>
                    <div className={classes.name}>{dir}</div>
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

export default FileManagerDirectories;