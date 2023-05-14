import React from 'react';
import classes from "./NotFound.module.scss";

const NotFound = ({children = undefined}: {children?: JSX.Element}) => {
    return (
        <div className='w-100 flex flex-column flex-a-c flex-j-c h-100'>
            <h1 className={classes.title}>404</h1>
            <div>
                {children}
            </div>
        </div>
    );
};

export default NotFound;