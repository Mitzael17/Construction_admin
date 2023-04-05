import React from 'react';
import {useFileManagerContext} from "../../../../../../hooks/contextHooks/useFileManagerContext";
import classes from '../../FileManager.module.scss';

const FileManagerBreadCrumbs = () => {

    const [{arrDirectories}, setFileManagerData] = useFileManagerContext();

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