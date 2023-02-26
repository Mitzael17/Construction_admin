import React, {useEffect, useState} from 'react';
import {Statuses} from "../../types/API";

const StatusResponse = ({status = Statuses.success}: {status: Statuses}) => {

    const [beginAnimation, setBeginAnimation] = useState(false);

    useEffect(() => {

        setTimeout( () => {

            setBeginAnimation(true);

        }, 500)

    });

    return (
        <div className={`status-response ${status}`}>
            <div className="circle-container center">
                <span className={`${beginAnimation ? 'active' : ''}`}></span>
                <span className={`${beginAnimation ? 'active' : ''}`}></span>
                <svg>
                    <circle className='circle' fill="none" strokeWidth='4' strokeDasharray={beginAnimation ? '360 800' : '0 800'} />
                </svg>
            </div>
            <div className={`status-response-title ${beginAnimation ? 'active' : ''}`}>{status}</div>
        </div>
    );
};

export default StatusResponse;