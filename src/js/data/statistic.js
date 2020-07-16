import { getDateInString } from '../utils/utils';

const minDate = new Date (2020, 6, 1);
const maxDate = new Date ();
const minWords = 0;
const maxWords = 3600;
const amountOfData = 8;

const getMidnight = (dateInMilliseconds) => {
    const date = new Date(dateInMilliseconds);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

const getArray = (isDate, arrayLength, min, max) => {
    const data = [];
    for (let i = 0; i < arrayLength; i+= 1) {
        const valueIsUnique = false;
        const counter = 0;
        while (!valueIsUnique) {
            const value = Math.floor(Math.random() * (max - min)) + min;
            value = isDate ? getMidnight(value) : value;
            if (data.indexOf(value) === -1) {
                data.push(value);
                valueIsUnique = true;
            }
            if (counter > 10000) throw new Error('It is impossible to create unique data. Check period');
        }
    }
    return data.sort((a, b) => {
        if (a > b) return 1;
        if (a == b) return 0;
        if (a < b) return -1;
    });
}

const getDatesWithValues = (dateInMilliseconds, valuesArray) => {
    return {
        date: `${dateInMilliseconds}`,
        value: `${valuesArray}`,
    }
}

const generateData = () => {
    const datesArray = getArray(true, amountOfData, minDate.getTime(), maxDate.getTime());
    const valuesArray = getArray(false, amountOfData, minWords, maxWords);
    const data = [];
    for (let i = 0; i < amountOfData; i+= 1) {
        data.push(getDatesWithValues(datesArray[i], valuesArray[i]));
    }
    return data;
}

const getData = () => {   
    const data = generateData();
    return {
        'arrayOfDatesAndValues': data,
        'options': {
            'axisX': {
                'min': new Date(Number(data[0].date)),
                'max': maxDate,
            },
            'axisY' : {
                'min': minWords,
                'max': maxWords,
            }
        }
    }
}

export default getData;
export { getMidnight };