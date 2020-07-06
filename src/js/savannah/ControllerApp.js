import getRandomInt from '../utils/getRandomInt';
import shuffleArr from '../utils/shuffleArr';

class ControllerApp {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    start() {
        this.view.render([1, 2, 3], 12);
        this.view.updateWords(this.loadWords(4), this.loadWords(4)[0]);
        this.checkUserAnswers();
    }

    checkUserAnswers() {
        this.view.getElement('#answer-btns-wrapper').addEventListener('click', (e) => {
            const curTarget = e.target;
            const question = this.view.getElement('#game-question-word');
            let xp = 0;
            let hp = 5;

            if (curTarget.getAttribute('word') === question.textContent) {
                xp += 10;
                this.view.getElement('#xp-bar-crystal-thumb').style.width = `${xp}%`;
                this.view.updateCrystal(true);

                this.view.updateWords(this.loadWords(4), this.loadWords(4)[0]);
            } else {
                hp -= 1;
                this.view.getElement('#game-hp-bar').innerHTML = '';
                for (let i = 0; i < hp; i += 1) {
                    const gameHpItem = this.view.createlement({node: 'div', styleName: 'savannah__hp-bar-item'});
                    this.view.getElement('#game-hp-bar').append(gameHpItem);
                }

                this.view.updateCrystal(false);
            }
        });
    }

    loadWords(amount) {
        const DB = JSON.parse(localStorage.getItem('DB'));
        const difficult = JSON.parse(localStorage.getItem('difficult'));
        const words = DB;
        const wordsForGame = new Set();

        shuffleArr(words).forEach(item => {
            if (item.difficult == difficult) {
                wordsForGame.add(item.word);
            }
        });

        if (wordsForGame.size < amount) {
            const page = getRandomInt(30);

            this.model.getWords(difficult, page)
                .then(data => {
                    const shuffle = shuffleArr(data);
                    shuffle.length = amount - wordsForGame.size;
                    shuffle.forEach(item => wordsForGame.add(item.word));
                    const resultArr = [];
                    wordsForGame.forEach(item => resultArr.push(item));
                    return resultArr;
                });


        } else {
            const resultArr = [];
            wordsForGame.forEach(item => resultArr.push(item));
            resultArr.length = amount;
            console.log(resultArr);
            return resultArr; 
        }

        return [];
    }
}

export default ControllerApp;