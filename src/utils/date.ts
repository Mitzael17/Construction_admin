import {dateComponents, FormatDatePattern} from "../types/utils/formatDate";

export function dateToFormat(date: Date, format: FormatDatePattern): string {

    const dateComponents: dateComponents = {
        Y: '' + date.getFullYear(),
        m: '0' + (date.getMonth() + 1),
        d: '0' + date.getDate(),
        h: '0' + date.getHours(),
        i: '0' + date.getMinutes(),
        s: '0' + date.getSeconds()
    }

    return format.replace(/[A-z]/g, function (letter) {

        return letter !== 'Y' ? dateComponents[letter as keyof dateComponents].slice(-2) : dateComponents[letter as keyof dateComponents];

    });

}


export function getDay(date: Date) {

    let weekDay = date.getDay();

    if(weekDay === 0) return 6;

    return weekDay - 1;

}

export function getLastDay(date: Date) {

    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

}