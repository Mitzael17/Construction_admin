import {Dispatch, SetStateAction} from "react";

export interface DateContextValues {
    dateFrom: Date,
    dateTo: Date
}


export interface DateChangeContextValues {

    setDateFrom: Dispatch<SetStateAction<Date>>,
    setDateTo: Dispatch<SetStateAction<Date>>

}