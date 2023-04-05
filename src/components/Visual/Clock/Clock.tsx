import React, {memo} from 'react';
import classes from "./Clock.module.scss";

const Clock = memo(({date}: {date: Date}) => {

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return (
        <div className={classes.clock}>
            <div className={classes.marks}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={classes.narrows}>
                <span
                    style={{transform: `translateY(-50%) rotate(${seconds * 6}deg)`}}
                    className={classes.seconds}>
                </span>
                <span
                    style={{transform: `translateY(-50%) rotate(${(minutes * 60 + seconds) * 0.1}deg)`}}
                    className={classes.minutes}>
                </span>
                <span
                    style={{transform: `translateY(-50%) rotate(${((hours * 60 + minutes) * 60 + seconds) * 0.0083333333333333 }deg)`}}
                    className={classes.hours}>
                </span>
            </div>
        </div>
    );


});

export default Clock;