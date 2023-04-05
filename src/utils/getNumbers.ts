export function getNumbers(limit: number) {

    const numbers: string[] = [];

    for( let number = 0; number <= limit; number++ ) {

        numbers.push(`0${number}`.slice(-2));

    }

    return numbers;

}