import React, {ForwardedRef, forwardRef, memo, useEffect, useRef} from 'react';
import CommentMessage from "../../../../components/Messages/CommentMessage/CommentMessage";
import Loading from "../../../../components/Visual/Loading";
import {ProjectCommentsAreaProps} from "../../types";
import {useComponentDidMount} from "../../../../hooks/useComponentDidMount";

const ProjectCommentsArea = memo(forwardRef(({isOver, isLoading, comments, socket, setEditingComment}: ProjectCommentsAreaProps, triggerRef: ForwardedRef<HTMLDivElement>) => {

    const areaRef = useRef<HTMLDivElement>(null);

    const didMount = useComponentDidMount();
    const prevScrollPosition = useRef(0);

    useEffect(() => {

        if(!areaRef.current) return;

        if(isLoading) {

            prevScrollPosition.current = areaRef.current.scrollHeight - areaRef.current.scrollTop;
            return;

        }

        if(!didMount || areaRef.current.scrollTop > areaRef.current.scrollHeight - areaRef.current.clientHeight - 300) {

            areaRef.current.scrollTop = areaRef.current.scrollHeight - areaRef.current.clientHeight;
            return;

        }

        areaRef.current.scrollTop = areaRef.current.scrollHeight - prevScrollPosition.current;

    }, [comments, isLoading]);


    return (
        <div
            ref={areaRef}
            className='border flex-shrink-1 flex-size-100 min-h-300px pl-15px pr-15px pb-20px max-h-600px overflow-auto customScroll'
        >
            {isOver && <div className='endLine'></div>}
            {isLoading && <div className='mt-20px center-x'><Loading /></div>}
            <div ref={triggerRef}></div>
            {comments.map( comment => (
                <CommentMessage setEditingComment={setEditingComment} socket={socket} comment={comment} key={comment.id} />
            )).reverse() }
        </div>
    );
}));

export default ProjectCommentsArea;