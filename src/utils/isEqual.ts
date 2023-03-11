export function isEqual(firstValue: any, secondValue: any): boolean {

    if(typeof firstValue !== 'object') return firstValue === secondValue;

    if(Object.keys(firstValue).length !== Object.keys(secondValue).length) return false;

    let result = true;

    for (let key in firstValue) {

        if(!result) break;

        if(typeof firstValue[key] === 'object' && typeof secondValue[key] === 'object') {

            result = isEqual(firstValue[key], secondValue[key]);

            continue;

        }

        result = firstValue[key] === secondValue[key];

    }

    return result;

}