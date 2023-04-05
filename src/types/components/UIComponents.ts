import {StateProps} from "./index";
import {
    ChangeEventHandler,
    Dispatch,
    MouseEventHandler,
    SetStateAction
} from "react";
import {BaseData} from "../API";

export interface InputProps extends StateProps<string>  {

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


export interface SelectProps extends StateProps<BaseData> {
    items: BaseData[]
}

export interface SearchBoxInterface<T extends BaseData|BaseData[]> {

    placeholder: string,
    chosenValue: T,
    setChosenValue: Dispatch<SetStateAction<T>>,
    table: string

}


export type SearchBoxProps = SearchBoxInterface<BaseData> | SearchBoxInterface<BaseData[]>;


export interface CalendarProps {

    initialDate?: Date,
    chooseTime?: boolean,
    date: Date,
    setDate: Dispatch<SetStateAction<Date>>

}


export type TimeBlockProps = Pick<CalendarProps, 'date'|'setDate'>;