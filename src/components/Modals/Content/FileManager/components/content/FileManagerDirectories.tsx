import React, {ChangeEvent, memo} from 'react';
import classes from "../../FileManager.module.scss";
import folder from "../../../../../../assets/folder.png";
import CheckBox from "../../../../../UI/CheckBox/CheckBox";
import {FileManagerDirectoriesListProps} from "../../../../../../types/components/ModalsComponents";

const FileManagerDirectories = memo(({directory, directories, setDirectory, setCheckedNames}: FileManagerDirectoriesListProps) => {

    return (
        <>
            {directories.map( dir => (
                <div
                    title={dir}
                    key={dir}
                    className={classes.item}
                    onDoubleClick={() => { setDirectory(dir); }}
                >
                    <div className={classes.imageContainer}>
                        <img src={folder} alt={dir}/>
                    </div>
                    <div className="flex flex-j-c">
                        <CheckBox name={directory + dir} onChange={handlerChange} />
                    </div>
                    <div className={classes.name}>
                        {dir.length > 12 ? dir.slice(0, 12) + '...' : dir}
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

export default FileManagerDirectories;