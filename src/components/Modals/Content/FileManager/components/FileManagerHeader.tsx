import React from 'react';
import classes from "../FileManager.module.scss";
import FileManagerBackButton from "./header/FileManagerBackButton";
import FileManagerUploadButton from "./header/FileManagerUploadButton";
import FileManagerAddFolderButton from "./header/FileManagerAddFolderButton";
import FileManagerDeleteButton from "./header/FileManagerDeleteButton";
import FileManagerSearch from "./header/FileManagerSearch";
import FileManagerBreadCrumbs from "./header/FileManagerBreadCrumbs";
import {useFileManagerContext} from "../../../../../hooks/contextHooks/useFileManagerContext";

const FileManagerHeader = () => {

    const [{arrDirectories}] = useFileManagerContext();

    return (
        <>
        <div className={classes.header}>
            <div className='flex relative kalaiIcon-container'>
                <FileManagerBackButton />
                <FileManagerUploadButton />
                <FileManagerAddFolderButton />
                <FileManagerDeleteButton />
            </div>
            <div className={classes.searchContainer}>
                <FileManagerSearch />
            </div>
        </div>
        {arrDirectories.length > 0 && <FileManagerBreadCrumbs />}
        </>
    );

};

export default FileManagerHeader;