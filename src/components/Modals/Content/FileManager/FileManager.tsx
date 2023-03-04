import React from 'react';
import {FileManagerProps} from "../../../../types/components/ModalsComponents";
import FileManagerProvider from "../../../Providers/FileManagerProvider";
import FileManagerWindow from "./FileManagerWindow";
import {FileManagerContextValues} from "../../../../types/contexts/FileManagerContextValues";
import {FilesResponse} from "../../../../types/API/files";

const FileManager = ({setImage, setVisible, prevTitle = ''}: FileManagerProps) => {

    // TODO make ajax validation (for directory)
    // TODO consider refactoring (directory constant)
    // TODO change styles for items

    const contextValues: FileManagerContextValues = {
        arrDirectories: [],
        isLoading: true,
        data: {
            directories: [],
            files: []
        },
        filteredData: {} as FilesResponse,
        checkedNames: [],
        setVisible: setVisible,
        inputFileRef: {current: null},
        prevTitle: prevTitle,
        uploadedFiles: null,
    };

    return (
        <FileManagerProvider values={contextValues}>
            <FileManagerWindow setImage={setImage}  />
        </FileManagerProvider>
    );
};

export default FileManager;