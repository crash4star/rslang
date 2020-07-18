const minWords = 0;
const maxDate = new Date();

const getMidnight = (dateInMilliseconds) => {
    const date = new Date(dateInMilliseconds);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

//! getArray is creating random data;
// const getArray = (isDate, arrayLength, min, max) => {
//     const data = [];
//     for (let i = 0; i < arrayLength; i+= 1) {
//         const valueIsUnique = false;
//         const counter = 0;
//         while (!valueIsUnique) {
//             const value = Math.floor(Math.random() * (max - min)) + min;
//             value = isDate ? getMidnight(value) : value;
//             if (data.indexOf(value) === -1) {
//                 data.push(value);
//                 valueIsUnique = true;
//             }
//             if (counter > 10000) throw new Error('It is impossible to create unique data. Check period');
//         }
//     }
//     return data.sort((a, b) => {
//         if (a > b) return 1;
//         if (a == b) return 0;
//         if (a < b) return -1;
//     });
// }

const getDatesWithValues = (dateInMilliseconds, valuesArray) => {
    return {
        date: `${dateInMilliseconds}`,
        value: `${valuesArray}`,
    }
}

const createArrayOfDatesAndValues = (datesArray, valuesArray) => {
    const data = [];
    for (let i = 0; i < datesArray.length; i++) {
        data.push(getDatesWithValues(datesArray[i], valuesArray[i]));
    }
    return data;
}

const getData = (data) => {
    const dates = Object.keys(data).map(el => new Date(el).getTime());
    const values = Object.values(data);
    let accumulator = 0;
    for (let i = 0; i < values.length; i += 1) {
        accumulator += values[i];
        values[i] = accumulator;
    }
    return createArrayOfDatesAndValues(dates, values);
}

const createDateObject = (data) => {  
    const datesWithValues = getData(data);
    return {
        'arrayOfDatesAndValues': datesWithValues,
        'options': {
            'axisX': {
                'min': datesWithValues[0].date,
                'max': maxDate,
            },
            'axisY' : {
                'min': minWords,
                'max': datesWithValues[datesWithValues.length - 1].value,
            }
        }
    }
}

export default createDateObject;
export { getMidnight };