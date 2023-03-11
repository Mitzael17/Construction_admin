import React from 'react';
import {FileManagerProps} from "../../../../types/components/ModalsComponents";
import FileManagerProvider from "../../../Providers/FileManagerProvider";
import FileManagerWindow from "./FileManagerWindow";
import {FileManagerContextValues} from "../../../../types/contexts/FileManagerContextValues";
import {FilesResponse} from "../../../../types/API/files";

const FileManager = ({setFile, setVisible, prevTitle = ''}: FileManagerProps) => {

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
            <FileManagerWindow setFile={setFile}  />
        </FileManagerProvider>
    );
};

export default FileManager;