import getRandomInt from '../utils/getRandomInt';
import AuthRequest from '../models/AuthRequest';
import Words from '../models/Words';
import Api from '../models/Api';
import Settings from '../models/Settings';
import Statistic from '../utils/createStatistic';
import UserWord from '../utils/UserWord';
class ControllerApp {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    start() {
        localStorage.removeItem('savannah-words');
        this.defaultUserHpXpBar();
        this.view.render();
        this.loadWords();
        this.closeGame();
    }

    defaultUserHpXpBar() {
        localStorage.setItem('hp', JSON.stringify(5));
        localStorage.setItem('xp', JSON.stringify(0));
        localStorage.setItem('savannah-result', JSON.stringify([]));
        localStorage.removeItem('savannah-words');
        localStorage.setItem('savannah-words', JSON.stringify([]));
        return this.view;
    }

    closeGame() {
        this.view.getElement('#back-to-profile-btn').addEventListener('click', () => {
            this.view.getElement('#savannah').remove();
            this.view.getElement('#root').innerHTML = '';
            this.view.getElement('#root').classList.remove('root-active');
        });
    }

    checkUserAnswers() {
        const btns = this.view.getAllElements('.savannah__answer-btn');
        const question = this.view.getElement('#game-question-word');
        const xp = JSON.parse(localStorage.getItem('xp'));
        const hp = JSON.parse(localStorage.getItem('hp'));
        const result = JSON.parse(localStorage.getItem('savannah-result'));
        const statistic = new Statistic(this.view);

        btns.forEach(item => {
            item.addEventListener('click', () => {
                if (hp === 1 || xp === 90) {
                    this.view.getElement('#savannah').classList.add('hide-savannah');
                    const resultSavannah = JSON.parse(localStorage.getItem('savannah-result'));
                    const savannahWords = JSON.parse(localStorage.getItem('savannah-words'));
                    const correct = [];
                    const incorrect = [];

                    resultSavannah.forEach(wordResult => {
                        if (wordResult.status === false) {
                            incorrect.push(wordResult.word);
                        } else {
                            correct.push(wordResult.word);
                        }
                    });
                    statistic.renderStat(correct, incorrect);

                    
                    resultSavannah.forEach(sendWord => {
                        savannahWords.forEach(toDbWord => {
                            if (sendWord.id === toDbWord.id) {
                                const wordSend = new Words(this.model.api, new AuthRequest(this.model.api));
                                const setWord = new UserWord(toDbWord, false);
                                setWord.setImportant();
                                const formatedWord = setWord.getUserWord();
                                if (formatedWord.difficulty === undefined) {
                                    formatedWord.difficulty = 'none';
                                }
                                wordSend.upsertUserWord(setWord.id, formatedWord);
                            }
                        });
                    });

                    this.view.getElement('.continueBtn').addEventListener('click', () => {
                        this.view.getElement('#savannah').remove();
                        this.view.getElement('#root').innerHTML = '';
                        this.start();
                    });

                    this.view.getElement('.onMainPageBtn ').addEventListener('click', () => {
                        this.view.getElement('#savannah').remove();
                        this.view.getElement('#root').innerHTML = '';
                        this.view.getElement('#root').classList.remove('root-active');
                    });
                }

                if (item.textContent === question.getAttribute('translate')) {
                    localStorage.setItem('xp', +xp + 10);
                    const newXp = JSON.parse(localStorage.getItem('xp'));
                    this.view.getElement('#xp-bar-crystal-thumb').style.width = `${newXp}%`;
                    this.view.updateCrystal(true);
                    this.loadWords();
                    result.push({ word: question.getAttribute('translate'), status: true, id: item.getAttribute('data-id') });
                    localStorage.setItem('savannah-result', JSON.stringify(result));
                } else {
                    localStorage.setItem('hp', +hp - 1);
                    const newHp = JSON.parse(localStorage.getItem('hp'));
                    this.view.updateCrystal(true);
                    this.view.createHpBar(newHp);
                    this.loadWords();
                    result.push({ word: question.getAttribute('translate'), status: false, id: item.getAttribute('data-id') });
                    localStorage.setItem('savannah-result', JSON.stringify(result));
                }
            });
        });
    }


    loadWords() {
        const difficult = new Settings(new Api(this.model.api.url), new AuthRequest(new Api(this.model.api.url)));
        const words = new Words(new Api(this.model.api.url), new AuthRequest(new Api(this.model.api.url)));
        const savannahWordsStorage = JSON.parse(localStorage.getItem('savannah-words'));

        difficult.getUserSettings().then(data => {
            this.view.getElement('#root').classList.add('savannah__wrapper--load');
            const userDifficult = data.optional.settingsProfile.difficult - 1;

            words.getUserWords().then(wordsData => {
                if (wordsData.length < 100) {
                    words.getWords(userDifficult, getRandomInt(30)).then(newWords => {
                        const gameWords = new Set();
                        newWords.forEach(item => {
                            gameWords.add({ id: item.id, word: item.word });
                        });
                        this.view.createAnswersBtns(4, gameWords);
                        this.checkUserAnswers();
                        newWords.forEach(item => {
                            savannahWordsStorage.push(item);
                        });
                        localStorage.setItem('savannah-words', JSON.stringify(savannahWordsStorage));
                        this.view.getElement('#root').classList.remove('savannah__wrapper--load');
                    });
                } else {
                    const gameWords = [];
                    wordsData.forEach(item => {
                        gameWords.push({ id: item.id, word: item.optional.word });
                    });
                    this.view.createAnswersBtns(4, gameWords);
                    this.checkUserAnswers();
                    wordsData.forEach(item => {
                        savannahWordsStorage.push(item);
                    });
                    localStorage.setItem('savannah-words', JSON.stringify(savannahWordsStorage));
                    this.view.getElement('#root').classList.remove('savannah__wrapper--load');
                }
            });
        });
    }
}

export default ControllerApp;