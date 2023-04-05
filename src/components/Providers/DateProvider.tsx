import React, {useState} from 'react';
import {DateChangeContext, DateContext} from "../../context/DateContext";

const DateProvider = ({children}: {children: JSX.Element}) => {

    const [dateTo, setDateTo] = useState<Date>(new Date('3000-01-01 23:59:59'));
    const [dateFrom, setDateFrom] = useState<Date>(new Date('1900-01-01 00:00:00'));

    return (
        <DateContext.Provider value={{dateTo, dateFrom}}>
            <DateChangeContext.Provider value={{setDateFrom, setDateTo}}>
                {children}
            </DateChangeContext.Provider>
        </DateContext.Provider>
    );
};

export default DateProvider;