import React from 'react';
import classes from "../FileManager.module.scss";
import FileManagerBackButton from "./header/FileManagerBackButton";
import FileManagerUploadButton from "./header/FileManagerUploadButton";
import FileManagerAddFolderButton from "./header/FileManagerAddFolderButton";
import FileManagerDeleteButton from "./header/FileManagerDeleteButton";
import FileManagerSearch from "./header/FileManagerSearch";
import FileManagerBreadCrumbs from "./header/FileManagerBreadCrumbs";
import {useFileManager} from "../../../../../hooks/useFileManager";

const FileManagerHeader = () => {

    const [{arrDirectories}] = useFileManager();

    return (
        <>
        <div className={classes.header}>
            <div className='flex relative'>
                <FileManagerBackButton />
                <FileManagerUploadButton />
                <FileManagerAddFolderButton />
                <FileManagerDeleteButton />
            </div>
            <FileManagerSearch />
        </div>
        {arrDirectories.length > 0 && <FileManagerBreadCrumbs />}
        </>
    );

};

export default FileManagerHeader;