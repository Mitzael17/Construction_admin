import React, {useRef, useState} from 'react';
import classes from "../FileManager.module.scss";
import Loading from "../../../../Visual/Loading";
import folder from "../../../../../assets/folder.png";
import {useFileManager} from "../../../../../hooks/useFileManager";
import {FileManagerProps} from "../../../../../types/components/ModalsComponents";

const FileManagerContent = ({setImage}: Omit<FileManagerProps, 'setVisible'|'prevTitle'>) => {

    const [fileManagerData, setFileManagerData] = useFileManager();
    const directory = fileManagerData.arrDirectories.join('/') + '/';

    const [isHover, setIsHover] = useState(false);
    const hoverCounter = useRef(0);

    return (
        <div className={classes.content}
            onDragEnter={(event) => handlerDragAndDrop(event, 'enter')}
            onDragLeave={(event) => handlerDragAndDrop(event, 'leave')}
            onDrop={(event) => handlerDragAndDrop(event, 'drop')}
            onDragOver={(event) => handlerDragAndDrop(event, 'over')}
            style={isHover ? {background: 'orange'} : {}}
        >
            {fileManagerData.isLoading ? <Loading /> : (
                <>
                    {fileManagerData.filteredData.directories.length > 0 || fileManagerData.filteredData.files.length > 0 ?
                        <>
                            {fileManagerData.filteredData.directories.map( dir => (
                                <div key={dir} onDoubleClick={() => {

                                    setFileManagerData({...fileManagerData, arrDirectories: [...fileManagerData.arrDirectories, dir], isLoading: true});

                                }} className={classes.item}>
                                    <div className={classes.imageContainer}>
                                        <img src={folder} alt={dir}/>
                                    </div>
                                    <label onClick={ event => event.stopPropagation()} className='checkbox center'>
                                        <input onChange={(event) => {

                                            if(event.target.checked) {

                                                setFileManagerData({...fileManagerData, checkedNames: [...fileManagerData.checkedNames, event.target.name]});

                                            } else {

                                                setFileManagerData({...fileManagerData, checkedNames: fileManagerData.checkedNames.filter(name => name !== event.target.name)});

                                            }

                                        }} type="checkbox" name={directory + dir} />
                                        <span></span>
                                    </label>
                                    <div className={classes.name}>{dir}</div>
                                </div>
                            ))}
                            {fileManagerData.filteredData.files.map(file => (
                                <div key={file.link} onDoubleClick={() => {

                                    fileManagerData.setVisible(false);
                                    setImage({
                                        inner_link: directory + file.name,
                                        out_link: file.link
                                    });

                                }} className={classes.item}>
                                    <div className={classes.imageContainer}>
                                        <img src={file.link} alt={file.name} />
                                    </div>
                                    <label onClick={ event => event.stopPropagation()} className='checkbox center'>
                                        <input onChange={(event) => {

                                            if(event.target.checked) {

                                                setFileManagerData({...fileManagerData, checkedNames: [...fileManagerData.checkedNames, event.target.name]});

                                            } else {

                                                setFileManagerData({...fileManagerData, checkedNames: fileManagerData.checkedNames.filter(name => name !== event.target.name)});

                                            }

                                        }} type="checkbox" name={directory + file.name} />
                                        <span></span>
                                    </label>
                                    <div className={classes.name}>{file.name}</div>
                                </div>
                            ))}
                        </>
                        : <h3>Not found</h3>}

                </>
            )}
        </div>
    );

    function handlerDragAndDrop(event: React.DragEvent<HTMLDivElement>, type : 'enter'|'leave'|'drop'|'over') {

        event.preventDefault();
        event.stopPropagation();


        if(type === 'enter') {

            setIsHover(true);
            hoverCounter.current++;

        }

        if(type === 'leave') {

            hoverCounter.current--;
            if (!hoverCounter.current) setIsHover(false);

        }

        if(type === 'drop') {

            hoverCounter.current = 0;
            setIsHover(false);

            (fileManagerData.inputFileRef.current as HTMLInputElement).files = event.dataTransfer.files;

            fileManagerData.inputFileRef.current?.dispatchEvent(new Event('change', {bubbles: true}));

        }

    }

};

export default FileManagerContent;