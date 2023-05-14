import React, {memo} from 'react';
import Button from "../../../../components/UI/Button/Button";
import {ProjectContentHeaderProps} from "../../types";
import Loading from "../../../../components/Visual/Loading";


const ProjectContentHeader = memo(({isAvailableToSubmit, alias, isLoading}: ProjectContentHeaderProps) => {


    return (
        <div className='projectContent__header gap-20px flex flex-wrap-mobile flex-j-fe'>
            <div className='min-w-200px w-100-mobile'>
                <Button>{alias === null ? 'Create page' : 'Edit page'}</Button>
            </div>
            <div className='min-w-200px w-100-mobile'>
                <Button type='submit' disabled={!isAvailableToSubmit}>{isLoading ? <Loading showText={false} diameter={20} /> : 'Save'}</Button>
            </div>
        </div>
    );

});

export default ProjectContentHeader;