import React, {ForwardedRef, forwardRef, memo, useEffect, useRef} from 'react';
import CommentMessage from "../../../../components/Messages/CommentMessage/CommentMessage";
import Loading from "../../../../components/Visual/Loading";
import {ProjectCommentsAreaProps} from "../../types";

const ProjectCommentsArea = memo(forwardRef(({isOver, isLoading, comments}: ProjectCommentsAreaProps, triggerRef: ForwardedRef<HTMLDivElement>) => {

    const areaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        if(!areaRef.current) return;

        areaRef.current.scrollTop = areaRef.current.scrollHeight - areaRef.current.clientHeight;

    });

    return (
        <div
            ref={areaRef}
            className='border flex-shrink-1 flex-size-100 min-h-300px pl-15px pr-15px pb-20px max-h-600px overflow-auto customScroll'
        >
            {isOver && <div className='endLine'></div>}
            {isLoading && <div className='mt-20px center-x'><Loading /></div>}
            <div ref={triggerRef}></div>
            {comments.map( comment => (
                <CommentMessage comment={comment} key={comment.id} />
            )).reverse() }
        </div>
    );
}));

export default ProjectCommentsArea;