import React, {memo, useRef} from 'react';
import ItemsList from "../../../components/Lists/ItemsList/ItemsList";
import {ProjectListProps} from "../../../types/components/ListsComponents";
import {ProjectStatuses} from "../../../types/API/projects";
import {ReducerTypes} from "../../../types";


const ProjectList = memo((
    {
        checkedProjects,
        dispatchCheckedProjects,
        projects
    }: ProjectListProps) => {

    const statusClasses = useRef(new Map([
        [ProjectStatuses.cancelled, 'projectStatus-cancelled'],
        [ProjectStatuses.finished, 'projectStatus-finished'],
        [ProjectStatuses.finishedWithoutPage, 'projectStatus-withoutPage'],
        [ProjectStatuses.inProcess, 'projectStatus-inProcess']
    ]));

    return (
        <ItemsList
            statusClasses={statusClasses.current}
            items={projects}
            onChecked={(event) => {

                dispatchCheckedProjects(
                    {
                        type: event.target.checked ? ReducerTypes.Add : ReducerTypes.Delete,
                        payload: event.target.name
                    }
                );

            }}
            checkedItems={checkedProjects}
        />
    );
});

export default ProjectList;