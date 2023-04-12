import {StateCallbackProps} from "./index";
import {ChangeEventHandler, Dispatch, MouseEventHandler, SetStateAction} from "react";
import {BaseData} from "../API";

export interface InputProps extends StateCallbackProps<string>  {

    placeholder: string,
    type?: 'password' | 'text',

}

export interface SearchInputProps extends Omit<InputProps, 'type'> {

    onClick: MouseEventHandler

}

export interface CheckBoxProps {

    placeholder?: string
    name?: string
    onChange: ChangeEventHandler<HTMLInputElement>,
    checked?: boolean,

}


export interface SelectProps extends StateCallbackProps<BaseData> {
    items: BaseData[],
    isLoading?: boolean,
    label?: string
}

export interface SearchBoxInterface<T extends BaseData|BaseData[]> {

    placeholder: string,
    chosenValue: T,
    setChosenValue: Dispatch<SetStateAction<T>> | ((value: T) => void),
    table: Tables,
    initialSearchValue?: string

}


export const enum Tables {
    clients = 'clients',
    services = 'services',
    project_statuses = 'project_status',
    admins = 'admins'
}

export type SearchBoxProps = SearchBoxInterface<BaseData> | SearchBoxInterface<BaseData[]>;


export interface CalendarProps {

    initialDate?: Date,
    chooseTime?: boolean,
    date: Date,
    setDate: Dispatch<SetStateAction<Date>>

}

export const enum DefaultDates {
    from = '1900-01-01 00:00:00',
    to = '3000-01-01 00:00:00'
}


