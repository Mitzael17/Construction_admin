import React, {FormEvent, memo, useEffect, useRef} from 'react';
import ContentEditableArea from "../../../../components/UI/ContentableArea/ContentEditableArea";
import Button from "../../../../components/UI/Button/Button";
import {useParams} from "react-router-dom";
import {useUserContext} from "../../../../hooks/contextHooks/useUserContext";
import {ProjectCommentsFormProps} from "../../types";
import Loading from "../../../../components/Visual/Loading";

const ProjectCommentsForm = memo(({socket, areaRef, editingComment, setEditingComment, loadingRequest, setLoadingRequest}: ProjectCommentsFormProps) => {

    const {id} = useParams();
    const [user] = useUserContext();
    const bufferMessage = useRef('');

    useEffect( () => {

        if(areaRef.current === null) return;

        if(editingComment === null) {

            areaRef.current.innerHTML = bufferMessage.current;
            bufferMessage.current = '';
            return;

        }

        if(!bufferMessage.current) bufferMessage.current = areaRef.current.innerHTML;

        areaRef.current.innerHTML = editingComment.text;

    }, [editingComment?.id]);

    return (
        <form onSubmit={handlerSubmit} className='flex-shrink-0 flex-grow-0  border flex pl-20px pr-20px pt-20px pb-20px flex-a-fe gap-20px flex-wrap-mobile'>
            <div className='w-100'>
                <ContentEditableArea ref={areaRef} />
            </div>
            <div className='min-w-200px flex gap-10px w-100-mobile'>
                {editingComment !== null && <Button onClick={() => setEditingComment(null)}>Cancel</Button>}
                <Button disabled={loadingRequest} type='submit'>
                    {loadingRequest ? <Loading diameter={20} showText={false} /> : 'Save'}
                </Button>
            </div>
        </form>
    );

    async function handlerSubmit(event: FormEvent) {

        event.preventDefault();

        if(id === undefined || !areaRef.current?.innerHTML || !socket.current || loadingRequest) return;

        setLoadingRequest(true);

        if(editingComment !== null) {

            socket.current.send(JSON.stringify({
                type: 'update',
                data: {...editingComment, text: areaRef.current.innerHTML}
            }));

            setEditingComment(null);
            return;

        }

        socket.current.send(JSON.stringify({
            type: 'create',
            data: {
                project_id: id,
                text: areaRef.current.innerHTML,
                admin_id: user.id
            }
        }));


        areaRef.current.innerHTML = '';

    }

});

export default ProjectCommentsForm;