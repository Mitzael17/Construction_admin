import React, {memo} from 'react';
import {useDateContext} from "../../../hooks/contextHooks/useDateContext";
import {dateToFormat} from "../../../utils/date";
import Calendar from "../../UI/Calendar/Calendar";

const DateRangeModalContent = memo(() => {

    const [{dateTo, dateFrom}, {setDateTo, setDateFrom}] = useDateContext();

    return (
        <>
            <div className='mb-20px'>
                <div className='mb-10px'>From: {dateToFormat(dateFrom, 'Y-m-d h:i:s')}</div>
                <div>To: {dateToFormat(dateTo, 'Y-m-d h:i:s')}</div>
            </div>
            <div className='flex gap-15px flex-j-c flex-wrap'>
                <Calendar date={dateFrom} chooseTime={true} setDate={setDateFrom} />
                <Calendar date={dateTo} chooseTime={true} setDate={setDateTo} />
            </div>
        </>
    );
});

export default DateRangeModalContent;