import React, {useEffect, useMemo} from 'react';
import LogsHeader from "./layouts/LogsHeader";
import LogsContent from "./layouts/LogsContent";
import {useListItemsContext} from "../../hooks/contextHooks/useListItemsContext";
import {useDateContext} from "../../hooks/contextHooks/useDateContext";
import {dateToFormat} from "../../utils/date";
import {useSortContext} from "../../hooks/contextHooks/useSortContext";
import FiltersBlock from "../../components/Blocks/FiltersBlock/FiltersBlock";
import {FiltersBlockItem} from "../../types/components/Blocks";
import {DefaultDates} from "../../types/components/UIComponents";


const Logs = () => {

    const [, {resetItems: resetLogs}] = useListItemsContext();
    const [sort] = useSortContext();
    const [{dateTo, dateFrom}, {setDateTo, setDateFrom}] = useDateContext();

    const dateToInFormat = dateToFormat(dateTo, 'Y-m-d h:i:s');
    const dateFromInFormat = dateToFormat(dateFrom, 'Y-m-d h:i:s');

    const filtersBlockData: FiltersBlockItem[] = useMemo( () => [
        {
            displayedValue: `Date from: ${dateFromInFormat}`,
            setValue: setDateFrom,
            valueToSet: new Date(DefaultDates.from),
            value: dateFrom
        },
        {
            displayedValue: `Date to: ${dateToInFormat}`,
            setValue: setDateTo,
            valueToSet: new Date(DefaultDates.to),
            value: dateTo,
        }
    ], [dateFromInFormat, dateToInFormat]);

    useEffect( () => {

        resetLogs();

    }, [dateToInFormat, dateFromInFormat, sort]);


    return (
        <div className='main'>
            <LogsHeader />
            <FiltersBlock values={filtersBlockData} />
            <LogsContent />
        </div>
    );
};

export default Logs;