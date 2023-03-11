import React from 'react';

const Loading = ({diameter = 100, showText = true}) => {
    return (
        <div className='center-x center-y'>
            <div style={{width: diameter, height: diameter}} className='loading'>
                <span></span>
                <span></span>
            </div>
            {showText && <div className="status-response-title">Loading</div>}
        </div>

    );
};

export default Loading;