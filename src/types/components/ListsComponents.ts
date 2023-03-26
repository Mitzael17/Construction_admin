import {CheckBoxProps} from "./UIComponents";
import {Dispatch} from "react";
import {CheckedItemsActions} from "../index";

export interface ListProps<S = string> {

    items: ListItem<S>[],
    statusClasses?: Map<string, string>
    onChecked?: CheckBoxProps['onChange'],
    checkedItems?: string[]


}

export interface ListItem<S = string> {

    id: number,
    title: string|JSX.Element,
    subtitle?: string|JSX.Element,
    date?: string,
    status?: S,
    link?: string

}


export interface ProjectListProps {

    checkedProjects: string[],
    dispatchCheckedProjects: Dispatch<CheckedItemsActions>,
    projects: ListItem[]

}