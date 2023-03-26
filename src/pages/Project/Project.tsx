import React from 'react';
import {useParams} from "react-router-dom";

const Project = () => {

    const {id} = useParams();
    

    return (
        <div className='main'>
            hello from project page! Id - {id}
        </div>
    );
};

export default Project;