import React, {memo} from 'react';
import Button from "../../../../components/UI/Button/Button";
import {ProjectContentHeaderProps} from "../../types";
import Loading from "../../../../components/Visual/Loading";


const ProjectContentHeader = memo(({isAvailableToSubmit, alias, isLoading}: ProjectContentHeaderProps) => {


    return (
        <div className='projectContent__header flex'>
            <div className='w-200px ml-auto'>
                <Button>{alias === null ? 'Create page' : 'Edit page'}</Button>
            </div>
            <div className='w-200px ml-20px'>
                <Button type='submit' disabled={!isAvailableToSubmit}>{isLoading ? <Loading showText={false} diameter={20} /> : 'Save'}</Button>
            </div>
        </div>
    );

});

export default ProjectContentHeader;