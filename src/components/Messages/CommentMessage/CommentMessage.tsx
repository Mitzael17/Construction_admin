import React from 'react';
import classes from './CommentMessage.module.scss';
import {ProjectComment} from "../../../types/API/projects";
const CommentMessage = ({comment}: {comment: ProjectComment}) => {

    return (
        <div className={classes.message}>
            <div className={classes.image}>
                <div className='profileLogo'>
                    <img src={comment.admin_image} alt={`Author - ${comment.admin_name}`} />
                </div>
            </div>
            <div dangerouslySetInnerHTML={{__html: comment.text}} />
        </div>
    );
};

export default CommentMessage;