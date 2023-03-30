import {CheckBoxProps} from "./UIComponents";
import {RefObject} from "react";

export interface ListProps {

    items: ListItem[],
    statusClasses?: Map<string, string>
    onChecked?: CheckBoxProps['onChange'],
    checkedItems?: string[]


}

export interface ListItem {

    id: number,
    title: string|JSX.Element,
    subtitle?: string|JSX.Element,
    date?: string,
    status?: string,
    link?: string

}


export type ListItemWithNode = ListItem&{nodeRef: RefObject<HTMLLIElement>};

export interface ListItemsItemProps {

    isChecked?: boolean,
    item: ListItemWithNode
    onChecked?: ListProps['onChecked'],
    status?: string

}