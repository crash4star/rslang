import shuffleArr from '../utils/shuffleArr';
import sendRequest from '../utils/sendRequest';
import getRandomInt from '../utils/getRandomInt';

function getWord(url) {
    const answerBtns = document.querySelectorAll('.savannah__answer-btn');
    let arr = [];

    sendRequest('GET', url)
        .then(data => {
            data.forEach(item => {
                arr.push(item.word);
            });
        })
        .then(() => {
            shuffleArr(arr);
            answerBtns.forEach((item, i) => {
                item.textContent = arr[i]
            });
        })
        .then(() => {
            const hiddenWord = document.querySelector('#savannah-hidden-word');
            const answersArr = [];

            answerBtns.forEach(item => {
                answersArr.push(item.textContent)
            });

            hiddenWord.textContent = answersArr[getRandomInt(4)];
            localStorage.setItem('used-word', JSON.stringify(hiddenWord.textContent));
        });
}

export default getWord;