import React from 'react';
import classes from "./Cube3D.module.scss";
const Cube3D = () => {
    return (
        <div className={classes.cube}>
            <div className={classes.container}>
                <div className={`${classes.top} ${classes.side}`}></div>
                <div className={`${classes.bottom} ${classes.side}`}></div>
                <div className={`${classes.left} ${classes.side}`}></div>
                <div className={`${classes.right} ${classes.side}`}></div>
                <div className={`${classes.front} ${classes.side}`}></div>
                <div className={`${classes.back} ${classes.side}`}></div>
            </div>
        </div>
    );
};

export default Cube3D;