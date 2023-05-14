import React from 'react';
import classes from './CommentMessage.module.scss';
import {useUserContext} from "../../../hooks/contextHooks/useUserContext";
import DeleteIcon from "../../Icons/KalaiIcons/DeleteIcon";
import EditIcon from "../../Icons/KalaiIcons/EditIcon";
import {ProjectMessageProps} from "../../../pages/Project/types";

const CommentMessage = ({comment, socket, setEditingComment}: ProjectMessageProps) => {

    const [{id: currentUserId}] = useUserContext();

    return (
        <div className={classes.message}>
            <div className={classes.image}>
                <div className='profileLogo'>
                    <img src={comment.admin_image} alt={`Author - ${comment.admin_name}`} />
                </div>
            </div>
            { comment.admin_id === currentUserId && (
                <div className={`flex border ${classes.commentButtons} `}>
                    <div className={`pointer-cursor ${classes.icon}`} onClick={handlerDeleteComment}>
                        <DeleteIcon />
                    </div>
                    <div className={`pointer-cursor ${classes.icon}`} onClick={() => setEditingComment(comment)}>
                        <EditIcon />
                    </div>
                </div>
            )}
            <div dangerouslySetInnerHTML={{__html: comment.text}} />
        </div>
    );

    function handlerDeleteComment() {

        if(!socket.current) return;

        socket.current.send(JSON.stringify({
            type: 'delete',
            data: {
                id: comment.id
            }
        }));

    }

};

export default CommentMessage;