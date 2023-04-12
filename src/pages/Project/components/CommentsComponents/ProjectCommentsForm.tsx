import React, {FormEvent, memo, useEffect, useRef} from 'react';
import ContentEditableArea from "../../../../components/UI/ContentableArea/ContentEditableArea";
import Button from "../../../../components/UI/Button/Button";
import {useParams} from "react-router-dom";
import {useUserContext} from "../../../../hooks/contextHooks/useUserContext";
import {ProjectComment} from "../../../../types/API/projects";
import {ProjectCommentsFormProps} from "../../types";

const ProjectCommentsForm = memo(({setComments}: ProjectCommentsFormProps) => {


    const areaRef = useRef<HTMLDivElement>(null);

    const {id} = useParams();

    const socket = useRef<WebSocket|null>(null);

    const [user] = useUserContext();

    useEffect( () => {

        if(socket.current !== null) return;

        socket.current = new WebSocket('ws://construction:8001');

        socket.current.addEventListener('message', ({data}: {data: string}) => {

            const comment: ProjectComment = JSON.parse(data);

            setComments(prev => [comment, ...prev]);

        })

    }, [])

    return (
        <form onSubmit={handlerSubmit} className='flex-shrink-0 flex-grow-0  border flex pl-20px pr-20px pt-20px pb-20px flex-a-fe gap-20px'>
            <div className='w-100'>
                <ContentEditableArea ref={areaRef} />
            </div>
            <div className='min-w-200px'>
                <Button type='submit'>Save</Button>
            </div>
        </form>
    );

    async function handlerSubmit(event: FormEvent) {

        event.preventDefault();

        if(id === undefined || !areaRef.current || !socket.current) return;

        socket.current.send(JSON.stringify({
            project_id: id,
            text: areaRef.current.innerHTML,
            admin_id: user.id
        }));

        areaRef.current.innerHTML = '';

    }

});

export default ProjectCommentsForm;