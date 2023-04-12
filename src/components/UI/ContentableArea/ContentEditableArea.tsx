import React, {ForwardedRef, forwardRef, memo} from 'react';
import classes from "./ContentEditableArea.module.scss";

const ContentEditableArea = memo(forwardRef( ({}, ref: ForwardedRef<HTMLDivElement>)  => {

    return (
        <div ref={ref} className={classes.area} contentEditable={true}></div>
    );
}));

export default ContentEditableArea;