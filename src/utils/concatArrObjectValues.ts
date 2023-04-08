
export function concatArrObjectValues(arr: {[key: string]: any}[], key: string) {

    return arr.reduce( (ac, item) => ac + `${item[key]}, `, '').replace(/,\s$/, '');

}