import React, {ChangeEvent, memo, useMemo} from 'react';
import ItemsList from "../../../components/Lists/ItemsList/ItemsList";
import {ProjectStatuses} from "../../../types/API/projects";
import {ReducerTypes} from "../../../types";
import {useListItems} from "../../../hooks/useListItems";
import {useCheckedItems} from "../../../hooks/useCheckedItems";



const ProjectsList = memo(() => {

    const statusClasses = useMemo(() => new Map([
        [ProjectStatuses.cancelled, 'projectStatus-cancelled'],
        [ProjectStatuses.finished, 'projectStatus-finished'],
        [ProjectStatuses.finishedWithoutPage, 'projectStatus-withoutPage'],
        [ProjectStatuses.inProcess, 'projectStatus-inProcess']
    ]), []);


    const [{items: projects}] = useListItems();
    const [checkedProjects, dispatchCheckedProjects] = useCheckedItems();

    const handlerChecked =(event: ChangeEvent<HTMLInputElement>) => {

        dispatchCheckedProjects(
            {
                type: event.target.checked ? ReducerTypes.Add : ReducerTypes.Delete,
                payload: event.target.name
            }
        );

    };

    return (
        <ItemsList
            statusClasses={statusClasses}
            items={projects}
            onChecked={handlerChecked}
            checkedItems={checkedProjects}
        />
    );
});

export default ProjectsList;