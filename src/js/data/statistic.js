import { getDateInString } from '../utils/utils';

const minDate = new Date (2020, 0, 1);
const maxDate = new Date ();
const minWords = 0;
const maxWords = 3600;
const amountOfData = 100;

const getArray = (arrayLength, min, max) => {
    const data = [];
    for (let i = 0; i < arrayLength; i+= 1) {
        data.push(Math.floor(Math.random() * (max - min)) + min);
    }
    return data.sort((a, b) => {
        if (a > b) return 1;
        if (a == b) return 0;
        if (a < b) return -1;
    });
}

const getDatesWithValues = (dateInMilliseconds, valuesArray) => {
    //const date = new Date(dateInMilliseconds);
    return {
        data: `${dateInMilliseconds}`,
        value: `${valuesArray}`,
    }
}

const generateData = () => {
    const datesArray = getArray(amountOfData, minDate.getTime(), maxDate.getTime());
    const valuesArray = getArray(amountOfData, minWords, maxWords);
    const data = [];
    for (let i = 0; i < amountOfData; i+= 1) {
        data.push(getDatesWithValues(datesArray[i], valuesArray[i]));
    }
    //console.log(data);
    return data;
}

const getData = () => {   
    const data = generateData();
    return {
        'arrayOfDatesAndValues': data,
        'options': {
            'axisX': {
                'min': new Date(Number(data[0].data)),
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