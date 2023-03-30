import React, {useState} from 'react';
import {FileManagerChangeContext, FileManagerContext} from "../../context/FileManagerContext";
import {FileManagerContextValues} from "../../types/contexts/FileManagerContextValues";

const FileManagerProvider = ({values, children}: {values: FileManagerContextValues, children: JSX.Element}) => {

    const [data, setData] = useState(values);

    return (
        <FileManagerContext.Provider value={data}>
        <FileManagerChangeContext.Provider value={setData}>
            {children}
        </FileManagerChangeContext.Provider>
        </FileManagerContext.Provider>
    );
};

export default FileManagerProvider;