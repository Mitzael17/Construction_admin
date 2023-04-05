import React, {useEffect, useRef} from 'react';
import LogsHeader from "./layouts/LogsHeader";
import LogsContent from "./layouts/LogsContent";
import {useListItemsContext} from "../../hooks/contextHooks/useListItemsContext";
import {useSearchContext} from "../../hooks/contextHooks/useSearchContext";
import {useDateContext} from "../../hooks/contextHooks/useDateContext";
import {dateToFormat} from "../../utils/date";
import {useSortContext} from "../../hooks/contextHooks/useSortContext";

const Logs = () => {

    const [search] = useSearchContext();

    const [, {resetItems: resetLogs}] = useListItemsContext();
    const prevSearch = useRef(search);

    const [{dateTo, dateFrom}] = useDateContext();

    const dateToInFormat = dateToFormat(dateTo, 'Y-m-d h:i:s');
    const dateFromInFormat = dateToFormat(dateFrom, 'Y-m-d h:i:s');

    const [sort] = useSortContext();

    useEffect( () => {

        if(search === prevSearch.current) return;

        const timer = setTimeout( () => {

            prevSearch.current = search;

            resetLogs();

        }, 500);

        return () => {
            clearTimeout(timer);
        };

    }, [search])

    useEffect( () => {

        resetLogs();

    }, [dateToInFormat, dateFromInFormat, sort]);

    return (
        <div className='main'>
            <LogsHeader />
            <LogsContent />
        </div>
    );
};

export default Logs;