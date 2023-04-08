import React, {useState} from 'react';
import {DateChangeContext, DateContext} from "../../context/DateContext";
import {DefaultDates} from "../../types/components/UIComponents";

const DateProvider = ({children}: {children: JSX.Element}) => {

    const [dateTo, setDateTo] = useState<Date>(new Date(DefaultDates.to));
    const [dateFrom, setDateFrom] = useState<Date>(new Date(DefaultDates.from));

    return (
        <DateContext.Provider value={{dateTo, dateFrom}}>
            <DateChangeContext.Provider value={{setDateFrom, setDateTo}}>
                {children}
            </DateChangeContext.Provider>
        </DateContext.Provider>
    );
};

export default DateProvider;