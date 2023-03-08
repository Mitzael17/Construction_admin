import React, {useEffect, useRef, useState} from 'react';
import classes from "../FileManager.module.scss";
import Loading from "../../../../Visual/Loading";
import {useFileManager} from "../../../../../hooks/useFileManager";
import {FileManagerProps} from "../../../../../types/components/ModalsComponents";
import FileManagerDirectories from "./content/FileManagerDirectories";
import FileManagerFiles from "./content/FileManagerFiles";

const FileManagerContent = ({setImage}: Pick<FileManagerProps, 'setImage'>) => {

    const [fileManagerData] = useFileManager();

    const [isHover, setIsHover] = useState(false);
    const hoverCounter = useRef(0);

    // checking for drag and drop
    const isFile = useRef(true);

    useEffect(() => {

        const changeIsFileFalse = () => {
            isFile.current = false;
        }

        const changeIsFileTrue = () => {
            isFile.current = true;
        }

        document.addEventListener('dragstart', changeIsFileFalse);
        document.addEventListener('dragend', changeIsFileTrue);

        return () => {

            document.removeEventListener('dragstart', changeIsFileFalse);
            document.removeEventListener('dragend', changeIsFileTrue);

        }

    }, [])


    return (
        <div className={`${classes.content} ${isHover ? classes.activeDragAndDrop : ''} `}
            onDragEnter={(event) => handlerDragAndDrop(event, 'enter')}
            onDragLeave={(event) => handlerDragAndDrop(event, 'leave')}
            onDrop={(event) => handlerDragAndDrop(event, 'drop')}
            onDragOver={(event) => handlerDragAndDrop(event, 'over')}
        >
            {fileManagerData.isLoading
                ?
                <div className='pos-abs-center'><Loading /></div>
                :
                (
                <>
                    {fileManagerData.filteredData.directories.length > 0 || fileManagerData.filteredData.files.length > 0
                        ?
                        <>
                            <FileManagerDirectories />
                            <FileManagerFiles setImage={setImage} />
                        </>
                        :
                        <h3>Not found</h3>
                    }
                </>
            )}
        </div>
    );


    function handlerDragAndDrop(event: React.DragEvent<HTMLDivElement>, type : 'enter'|'leave'|'drop'|'over') {

        if(!isFile.current) return;

        event.preventDefault();
        event.stopPropagation();

        if(type === 'enter') {

            setIsHover(true);
            hoverCounter.current++;

            return;

        }

        if(type === 'leave') {

            hoverCounter.current--;
            if (!hoverCounter.current) setIsHover(false);

            return;

        }

        if(type === 'drop') {

            hoverCounter.current = 0;
            setIsHover(false);

            (fileManagerData.inputFileRef.current as HTMLInputElement).files = event.dataTransfer.files;

            fileManagerData.inputFileRef.current?.dispatchEvent(new Event('change', {bubbles: true}));

            return;

        }

    }

};

export default FileManagerContent;