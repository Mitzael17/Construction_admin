import React, {useEffect, useRef, useState} from 'react';
import ProjectCommentsArea from "../components/CommentsComponents/ProjectCommentsArea";
import ProjectCommentsForm from "../components/CommentsComponents/ProjectCommentsForm";
import {useLazyLoading} from "../../../hooks/useLazyLoading";
import {$getComments} from "../../../api/projectsAPI";
import {useParams} from "react-router-dom";
import {ProjectComment, ProjectWebsocketResponse} from "../../../types/API/projects";
import {WEBSOCKET_URL} from "../../../data/config";

const ProjectComments = () => {

    const triggerRef = useRef<HTMLDivElement>(null);

    const limit = 50;
    const [comments, setComments, isLoading, isOver] = useLazyLoading<ProjectComment>(triggerRef, limit, loadComments);

    const [loadingRequest, setLoadingRequest] = useState(false);

    const totalSkipComments = useRef(0);

    const {id} = useParams();

    const socket = useRef<WebSocket|null>(null);
    const areaRef = useRef<HTMLDivElement>(null);

    const [editingComment, setEditingComment] = useState<null|ProjectComment>(null);

    useEffect( () => {

        if(socket.current !== null) return;

        socket.current = new WebSocket(WEBSOCKET_URL);

        socket.current.onmessage = ({data}: {data: string}) => {

            setLoadingRequest(false);

            const comment: ProjectWebsocketResponse = JSON.parse(data);

            if(comment.type === 'create') {

                setComments(prev => [comment.data, ...prev]);

                totalSkipComments.current++;

                return;

            }

            if(comment.type === 'delete') {

                setComments( prev => prev.filter( ({id}) => id !== comment.data.id ));
                return;

            }

            if(comment.type === 'update') {

                setComments( prev => prev.map( item => {

                    if(item.id !== comment.data.id) return item;

                    return {...item, text: comment.data.text};

                }))

                return;

            }

            console.log('Unknown comment type!');

        }

    }, [])

    return (
        <div className='min-w-500px media flex-size-500px flex flex-column flex-grow-1'>
            <ProjectCommentsArea setEditingComment={setEditingComment} socket={socket} comments={comments} ref={triggerRef} isLoading={isLoading} isOver={isOver} />
            <ProjectCommentsForm loadingRequest={loadingRequest} setLoadingRequest={setLoadingRequest} setEditingComment={setEditingComment} editingComment={editingComment} areaRef={areaRef} socket={socket} />
        </div>
    );

    async function loadComments(page: number) {

        if(!id) return [];

        return await $getComments(+id, {page, limit, skipComments: totalSkipComments.current});

    }

};

export default ProjectComments;