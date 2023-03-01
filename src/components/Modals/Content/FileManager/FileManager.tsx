import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import classes from "./FileManager.module.scss";
import BendArrowLeftIcon from "../../../Icons/KalaiIcons/BendArrowLeftIcon";
import UploadFileIcon from "../../../Icons/KalaiIcons/UploadFileIcon";
import AddFolderIcon from "../../../Icons/KalaiIcons/AddFolderIcon";
import DeleteIcon from "../../../Icons/KalaiIcons/DeleteIcon";
import SearchInput from "../../../UI/Input/SearchInput";
import {FilesResponse} from "../../../../types/API/files";
import {$deleteFiles, $getFiles, $uploadFiles} from "../../../../api/filesAPI";
import {ErrorResponse, Statuses} from "../../../../types/API";
import folder from "../../../../assets/folder.png";
import Loading from "../../../Visual/Loading";
import {FileManagerProps} from "../../../../types/components/ModalsComponents";
import {useModal} from "../../../../hooks/useModal";

const FileManager = ({setImage, setVisible, prevTitle = null}: FileManagerProps) => {

    const [modalData, setModalData] = useModal();

    const [searchValue, setSearchValue] = useState('');
    const [arrDirectories, setArrDirectories] = useState<string[]>([]);

    let checkedNames: string[] = [];

    const directory = arrDirectories.join('/') + '/';
    const inputFileRef = useRef<null|HTMLInputElement>(null);
    const data = useRef<null|FilesResponse>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isHover, setIsHover] = useState(false);
    const hoverCounter = useRef(0);

    const [filteredData, setFilteredData] = useState(data.current as FilesResponse);


    useEffect(() => {

        setModalData({title: 'File manager'});

    }, [])

    useEffect( () => {

        let ignore  = false;

        (async function() {

            data.current = null;

            const response = await $getFiles(directory);

            if(!ignore) {

                if((response as ErrorResponse)?.status) {

                    alert((response as ErrorResponse).message);

                } else {

                    data.current = response as FilesResponse;
                    setFilteredData(data.current);
                    setIsLoading(false);

                }

            }

        })();

        return () => {ignore = true};

    }, [arrDirectories]);

    return (
        <div>
            <div className={classes.header}>
                <div className='flex'>
                    <div onClick={() => {

                        if(!directory || directory === '/') {

                            setVisible(false);
                            if(prevTitle) setModalData({title: prevTitle});
                            return;

                        }

                        setArrDirectories(dir => {

                            const new_dir = JSON.parse(JSON.stringify(dir));

                            new_dir.pop();

                            return new_dir;

                        });

                        setIsLoading(true);

                    }} className='kalaiIconDark'>
                        <BendArrowLeftIcon />
                    </div>
                    <label className='kalaiIconDark no_stroke'>
                        <UploadFileIcon />
                        <input ref={inputFileRef} style={{display: 'none'}} type="file" multiple onChange={uploadFile}/>
                    </label>
                    <div className='kalaiIconDark'>
                        <AddFolderIcon />
                    </div>
                    <div onClick={async () => {

                        if(checkedNames.length < 1) return;

                        setIsLoading(true);

                        const data = await $deleteFiles(checkedNames);

                        setFilteredData(
                            {files: filteredData.files.filter( ({name}) => checkedNames.indexOf(name) !== -1),
                                directories: filteredData.directories.filter( name => checkedNames.indexOf(name) !== -1)
                            }
                        );

                        setIsLoading(false);


                    }} className='kalaiIconDark'>
                        <DeleteIcon />
                    </div>
                </div>
                <SearchInput onClick={filterData} placeholder='Search...' value={searchValue} setValue={setSearchValue} />
            </div>
            <div className={classes.content}
                 onDragEnter={(event) => handlerDragAndDrop(event, 'enter')}
                 onDragLeave={(event) => handlerDragAndDrop(event, 'leave')}
                 onDrop={(event) => handlerDragAndDrop(event, 'drop')}
                 onDragOver={(event) => handlerDragAndDrop(event, 'over')}
                 style={isHover ? {background: 'orange'} : {}}
            >
                {isLoading ? <Loading /> : (
                    <>
                        {filteredData.directories.length > 0 || filteredData.files.length > 0 ?
                            <>
                                {filteredData.directories.map( dir => (
                                    <div key={dir} onClick={() => {

                                        setArrDirectories([...arrDirectories, dir]);
                                        setIsLoading(true);

                                    }} className={classes.item}>
                                        <div className={classes.imageContainer}>
                                            <img src={folder} alt={dir}/>
                                        </div>
                                        <div className={classes.name}>{dir}</div>
                                    </div>
                                ))}
                                {filteredData.files.map(file => (
                                    <div key={file.link} onClick={() => {

                                        setVisible(false);
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

                                                if(event.target.checked) checkedNames.push(event.target.name);
                                                else checkedNames = checkedNames.filter(name => name !== event.target.name);

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
        </div>
    );

    function filterData(event: React.MouseEvent) {

        event.preventDefault();

        if(data.current) {

            setFilteredData({
                directories: data.current.directories.filter( (name) => name.match(searchValue) ),
                files: data.current.files.filter( ( {name} ) => name.match(searchValue))
            });

        }

    }

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

            (inputFileRef.current as HTMLInputElement).files = event.dataTransfer.files;

            inputFileRef.current?.dispatchEvent(new Event('change', {bubbles: true}));

        }


    }

    async function uploadFile(event: ChangeEvent<HTMLInputElement>) {

        if(!event.target?.files) alert('You didn\'t choose any file');

        const data = await $uploadFiles(event.target.files as FileList, directory);


            alert(data.status);



    }

};

export default FileManager;