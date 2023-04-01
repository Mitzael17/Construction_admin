import React from 'react';
import {useFileManager} from "../../../../../../hooks/contextHooks/useFileManager";
import classes from '../../FileManager.module.scss';

const FileManagerBreadCrumbs = () => {

    const [{arrDirectories}, setFileManagerData] = useFileManager();

    return (
        <ul className={classes.breadCrumbs}>
            <li onClick={ () => {

                setFileManagerData( prevData => ({
                    ...prevData,
                    arrDirectories: [],
                    isLoading: true
                }));

            }}>Root</li>
            {arrDirectories.map( (dir, index) => (
                <li key={dir + index} onClick={() => {

                    setFileManagerData( prevData => ({
                        ...prevData,
                        arrDirectories: arrDirectories.slice(0, index + 1),
                        isLoading: true,
                    }));

                }}>
                    {dir}
                </li>
            ))}
        </ul>
    );
};

export default FileManagerBreadCrumbs;