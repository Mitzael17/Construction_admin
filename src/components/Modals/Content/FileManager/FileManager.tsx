import React, {Dispatch, MutableRefObject, SetStateAction} from 'react';
import {FileManagerProps} from "../../../../types/components/ModalsComponents";
import FileManagerProvider from "../../../Providers/FileManagerProvider";
import FileManagerWindow from "./FileManagerWindow";
import {FileManagerContextValues} from "../../../../types/contexts/FileManagerContextValues";
import {FilesResponse} from "../../../../types/API/files";

const FileManager = ({setImage, setVisible, prevTitle = ''}: FileManagerProps) => {

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
        prevTitle: prevTitle
    };

    return (
        <FileManagerProvider values={contextValues}>
            <FileManagerWindow setImage={setImage}  />
        </FileManagerProvider>
    );
};

export default FileManager;