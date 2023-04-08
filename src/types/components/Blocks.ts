import {CalendarProps} from "./UIComponents";
import {StateProps} from "./index";

export type TimeBlockProps = Pick<CalendarProps, 'date' | 'setDate'>;

export interface FiltersBlockItem extends StateProps<any> {

    displayedValue: string,
    valueToSet: any

}

export interface FiltersBlockProps {

   values: FiltersBlockItem[]

}