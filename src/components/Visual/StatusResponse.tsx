import React, {memo, useEffect, useState} from 'react';
import {PostResponse} from "../../types/API";

const StatusResponse = memo(({response}: {response: PostResponse}) => {

    const [beginAnimation, setBeginAnimation] = useState(false);

    useEffect(() => {

        setTimeout( () => {

            setBeginAnimation(true);

        }, 500)

    });

    return (
        <div className={`status-response ${response.status}`}>
            <div className="circle-container center-x center-y">
                <span className={`${beginAnimation ? 'active' : ''}`}></span>
                <span className={`${beginAnimation ? 'active' : ''}`}></span>
                <svg>
                    <circle className='circle' fill="none" strokeWidth='4' strokeDasharray={beginAnimation ? '360 800' : '0 800'} />
                </svg>
            </div>
            <div className={`status-response-title ${beginAnimation ? 'active' : ''}`}>{response.status}</div>
            {'message' in response && <div className={`status-response-message ${beginAnimation ? 'active' : ''}`}>{response.message}</div>}
        </div>
    );
});

export default StatusResponse;