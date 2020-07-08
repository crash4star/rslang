import getRandomInt from '../utils/getRandomInt';

class ControllerApp {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    start() {
        this.view.render();
        this.loadWords();
        localStorage.setItem('hp', JSON.stringify(5));
        localStorage.setItem('xp', JSON.stringify(0));
    }

    checkUserAnswers(words) {
        const xp = JSON.parse(localStorage.getItem('xp'));
        const hp = JSON.parse(localStorage.getItem('hp'));
        const changeWords = words;

        setTimeout(() => {
            localStorage.setItem('hp', +hp - 1);
            const newHp = JSON.parse(localStorage.getItem('hp'));
            this.view.createAnswersBtns(4, changeWords);
            this.view.updateCrystal(true);
            this.view.createHpBar(newHp);
            this.checkUserAnswers(changeWords);
        }, 5000);



        if (xp == 100 || hp == 0) {
            alert('end game / statistic') // Temporary solution
        } else {
            this.view.getElement('#answer-btns-wrapper').addEventListener('click', (e) => {
                const curTarget = e.target.closest('button');
                const question = this.view.getElement('#game-question-word');

                if (curTarget.textContent === question.textContent) {
                    localStorage.setItem('xp', +xp + 10);
                    const newXp = JSON.parse(localStorage.getItem('xp'));

                    this.view.getElement('#xp-bar-crystal-thumb').style.width = `${newXp}%`;
                    this.view.updateCrystal(true);
                    changeWords.forEach(item => {
                        if (item.word === curTarget.textContent) {
                            changeWords.delete(item);
                        }
                    });
                    this.view.createAnswersBtns(4, changeWords);
                    this.checkUserAnswers(changeWords);


                } else {
                    localStorage.setItem('hp', +hp - 1);
                    const newHp = JSON.parse(localStorage.getItem('hp'));
                    this.view.createAnswersBtns(4, changeWords);
                    this.view.updateCrystal(true);
                    this.view.createHpBar(newHp);
                    this.checkUserAnswers(changeWords);
                }
            });
        }
    }


    loadWords() {
        const difficult = JSON.parse(localStorage.getItem('difficult'));
        let page = getRandomInt(30);
        this.view.getElement('#savannah').classList.add('savannah__wrapper--load');
        this.model.getWords(difficult, page)
            .then(data => {
                const words = new Set();

                data.forEach(item => {
                    words.add({ word: item.word, id: item.id });
                    if (words.size < 40) {
                        page = getRandomInt(30);
                        words.add({ word: item.word, id: item.id });
                    }
                });

                return words;
            })
            .then(words => {
                const checkWords = words;
                this.view.createAnswersBtns(4, checkWords);
                this.checkUserAnswers(checkWords);
                this.view.getElement('#savannah').classList.remove('savannah__wrapper--load');
            });
    }
}

export default ControllerApp;