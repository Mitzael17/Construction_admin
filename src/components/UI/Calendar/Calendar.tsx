import React, {memo, startTransition, useState} from 'react';
import classes from "./Calendar.module.scss";
import {CalendarProps} from "../../../types/components/UIComponents";
import {useGeneratorId} from "../../../hooks/useGeneratorId";
import TinyButton from "../Button/TinyButton";
import TimeBlock from "../../Blocks/TimeBlock/TimeBlock";
import {dateToFormat, getDay, getLastDay} from "../../../utils/date";

const Calendar = memo(({date, setDate, initialDate = new Date(), chooseTime = false}: CalendarProps) => {

    // Date and time, that are displayed in the calendar
    const [displayedDate, setDisplayedDate] = useState(initialDate);

    const dateInFormat = dateToFormat(date, 'Y-m-d');

    const weeks = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const [isOpenTime, setIsOpenTime] = useState(false);

    const getId = useGeneratorId();

    // The state is necessary for optimization loading of the time block
    const [timeBlockLoaded, setTimeBlockLoaded] = useState(false);


    return (
        <div className='relative max-w-300px'>
            <div className={classes.calendar}>
                {chooseTime && (
                    <div className='w-150px flex mb-15px ml-auto'>
                        <TinyButton onClick={ () => {

                            if(!timeBlockLoaded) {

                                setTimeBlockLoaded(true);
                                startTransition(() => setIsOpenTime(prev => !prev));

                                return;
                            }

                            setIsOpenTime(prev => !prev);

                        }}>{ isOpenTime ? 'Close' : 'Change Time'}</TinyButton>
                    </div>
                )}
                <div className={classes.year}>{displayedDate.getFullYear()}</div>
                <div className="flex flex-j-sb">
                    <div
                        onClick={toPreviousMonth}
                        className={`${classes.narrow} ${classes.narrow_left}`}>
                    </div>
                    <div className={classes.month}>{months[displayedDate.getMonth()]}</div>
                    <div
                        onClick={toNextMonth}
                        className={`${classes.narrow} ${classes.narrow_right}`}>
                    </div>
                </div>
                <table className={classes.table}>
                    <thead>
                    <tr>
                        {weeks.map( week => <th key={getId()} >{week}</th>)}
                    </tr>
                    </thead>
                    <tbody>
                    {getCells().map( row => (
                        <tr key={getId()}>
                            {row.map( cell => (
                                <td
                                    className={`${cell.class} ${dateInFormat === cell.date ? classes.chosen : ''}`}
                                    key={getId()}
                                    onClick={ () => chooseDate(cell.date)}
                                >
                                    {cell.day}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {chooseTime && timeBlockLoaded && (
                <div className={`${classes.timeContainer} ${isOpenTime ? classes.active : ''}`}>
                    <TimeBlock date={date} setDate={setDate} />
                </div>
            )}
        </div>
    );


    function getCells() {

        type Row = {class?: string, day: number, date: string};

       const rows: Row[][] = [];

       // It is current month, that will be displayed in the calendar
       const date = new Date(displayedDate.getFullYear(), displayedDate.getMonth(), 1);
       let dateInFormat = dateToFormat(date, 'Y-m-d');

       const firstDayOfWeek = getDay(date);
       const lastDay = getLastDay(displayedDate);

       let isOver = false;
       let day = 1;

       while(!isOver) {

           const row: Row[] = [];

           for(let cell = 0; cell < 7; cell++) {

               if(day === lastDay) isOver = true;

               // If the condition is true, then we must render first days of the next month.
               if(day > lastDay) {

                   day = 1;

                   dateInFormat = dateToFormat(new Date(date.getFullYear(), date.getMonth() + 1, 1), 'Y-m-d');

               }

               // If the condition is true, then we must render last days of the previous month
               if(day === 1 && !isOver && firstDayOfWeek !== 0) {

                   const previousMonth = new Date(displayedDate.getFullYear(), displayedDate.getMonth(), 0);
                   let prevDateInFormat = dateToFormat(previousMonth, 'Y-m-d');

                   let prevDate = previousMonth.getDate();

                   for( let index = firstDayOfWeek; index !== 0; index-- ) {

                       row[firstDayOfWeek - cell - 1] = {
                           class: classes.prevNextDay,
                           day: prevDate--,
                           date: prevDateInFormat
                       };

                       prevDateInFormat = prevDateInFormat.replace(/\d\d$/, `0${prevDate}`.slice(-2));

                       cell++;

                   }

               }

               row[cell] = {
                   class: isOver && day !== lastDay ? classes.prevNextDay : '',
                   day: day++,
                   date: dateInFormat
               };

               dateInFormat = dateInFormat.replace(/\d\d$/, `0${day}`.slice(-2));

           }

           rows.push(row);

       }

       return rows;

    }

    function chooseDate(date: string) {

        setDate(prevDate => {

            const [year, month, day] = date.split('-');

            return new Date(+year, +month - 1, +day, prevDate.getHours(), prevDate.getMinutes(), prevDate.getSeconds());

        });

    }

    function toNextMonth() {

        setDisplayedDate(new Date(displayedDate.getFullYear(), displayedDate.getMonth() + 1))

    }

    function toPreviousMonth() {
        setDisplayedDate(new Date(displayedDate.getFullYear(), displayedDate.getMonth() - 1))
    }

});

export default Calendar;