import React, {useState} from 'react';
import {fileManagerChangeContext, fileManagerContext} from "../../context/fileManagerContext";
import {FileManagerContextValues} from "../../types/contexts/FileManagerContextValues";

const FileManagerProvider = ({values, children}: {values: FileManagerContextValues, children: JSX.Element}) => {

    const [data, setData] = useState(values);

    return (
        <fileManagerContext.Provider value={data}>
        <fileManagerChangeContext.Provider value={setData}>
            {children}
        </fileManagerChangeContext.Provider>
        </fileManagerContext.Provider>
    );
};

export default FileManagerProvider;