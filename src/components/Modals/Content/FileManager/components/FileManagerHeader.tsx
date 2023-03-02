import React from 'react';
import classes from "../FileManager.module.scss";
import FileManagerBackButton from "./header/FileManagerBackButton";
import FileManagerUploadButton from "./header/FileManagerUploadButton";
import FileManagerAddFolderButton from "./header/FileManagerAddFolderButton";
import FileManagerDeleteButton from "./header/FileManagerDeleteButton";
import FileManagerSearch from "./header/FileManagerSearch";

const FileManagerHeader = () => {

    return (
        <div className={classes.header}>
            <div className='flex'>
                <FileManagerBackButton />
                <FileManagerUploadButton />
                <FileManagerAddFolderButton />
                <FileManagerDeleteButton />
            </div>
            <FileManagerSearch />
        </div>
    );

};

export default FileManagerHeader;