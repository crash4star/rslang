import getRandomInt from '../utils/getRandomInt';
import shuffleArr from '../utils/shuffleArr';

class View {
    constructor() {
        this.app = this.getElement('.root');
    }

    render() {
        const wrapper = this.createElement({ node: 'div', styleName: 'savannah__wrapper', id: 'savannah' });
        const gameInfo = this.createElement({ node: 'div', styleName: 'savannah__game-info', id: 'savannah-game-info' });
        const gameViewport = this.createElement({ node: 'div', styleName: 'savannah__game-viewport', id: 'savannah-game-viewport' });

        this.app.append(wrapper);
        this.getElement(`#${wrapper.id}`).append(gameInfo);
        this.getElement(`#${wrapper.id}`).append(gameViewport);

        const gameBar = this.createElement({ node: 'div', styleName: 'savannah__game-bar', id: 'game-bar' });
        const gamebackToProfileBtn = this.createElement({ node: 'button', styleName: 'savannah__back-to-profile-btn', id: 'back-to-profile-btn' });
        const gameHpWrapper = this.createElement({ node: 'div', styleName: 'savannah__hp-bar', id: 'game-hp-bar' });
        const gameXpWrapper = this.createElement({ node: 'div', styleName: 'savannah__xp-bar', id: 'game-xp-bar' });

        this.getElement(`#${gameInfo.id}`).append(gameBar);
        this.getElement(`#${gameBar.id}`).append(gamebackToProfileBtn);
        this.getElement(`#${gameBar.id}`).append(gameHpWrapper);
        this.getElement(`#${gameBar.id}`).append(gameXpWrapper);

        for (let i = 0; i < 5; i += 1) {
            const gameHpItem = this.createElement({ node: 'div', styleName: 'savannah__hp-bar-item' });
            this.getElement(`#${gameHpWrapper.id}`).append(gameHpItem);
        }

        const gameXpCrystalIcon = this.createElement({ node: 'div', styleName: 'savannah__xp-bar-crystal-icon' });
        const gameXpCrystaWrapper = this.createElement({ node: 'div', styleName: 'savannah__xp-bar-crystal-wrapper', id: 'xp-bar-crystal-wrapper' });
        const gameXpCrystaRange = this.createElement({ node: 'div', styleName: 'savannah__xp-bar-crystal-range', id: 'xp-bar-crystal-range' });
        const gameXpCrystaThumb = this.createElement({ node: 'div', styleName: 'savannah__xp-bar-crystal-thumb', id: 'xp-bar-crystal-thumb' });

        this.getElement(`#${gameXpWrapper.id}`).append(gameXpCrystalIcon);
        this.getElement(`#${gameXpWrapper.id}`).append(gameXpCrystaWrapper);
        this.getElement(`#${gameXpCrystaWrapper.id}`).append(gameXpCrystaRange);
        this.getElement(`#${gameXpCrystaWrapper.id}`).append(gameXpCrystaThumb);

        const gameShotItem = this.createElement({ node: 'div', styleName: 'savannah__game-shot-item', id: 'game-shot-item' });

        this.getElement(`#${gameViewport.id}`).append(gameShotItem);

        const gameAnswerBar = this.createElement({ node: 'div', styleName: 'savannah__answer-bar', id: 'game-answer-bar' });
        this.getElement(`#${gameInfo.id}`).append(gameAnswerBar);
    }

    createAnswersBtns(amount, words = []) {
        if (this.getElement('#game-answer-bar') !== '#root') {
            this.getElement('#game-answer-bar').innerHTML = '';
        }

        const gameQuestionWord = this.createElement({ node: 'h2', styleName: 'savannah__question-word', id: 'game-question-word' });
        const gameAnswerBtnsWrapper = this.createElement({ node: 'div', styleName: 'savannah__answer-btns-wrapper', id: 'answer-btns-wrapper' });

        this.getElement('#game-answer-bar').append(gameQuestionWord);
        this.getElement('#game-answer-bar').append(gameAnswerBtnsWrapper);

        for (let i = 0; i < amount; i += 1) {
            const gameAnswerBtn = this.createElement({ node: 'button', styleName: 'savannah__answer-btn' });
            this.getElement(`#${gameAnswerBtnsWrapper.id}`).append(gameAnswerBtn);
        }

        let result;
        this.getAllElements('.savannah__answer-btn').forEach(btn => {
            const questionWords = new Set();
            words.forEach(item => {
                if (questionWords.size < 4) {
                    questionWords.add({word: item.word, id: item.id});
                }
            });
            result = Array.from(questionWords);
        });
        if (result !== undefined) {
            shuffleArr(result).forEach((item, i) => {
                this.getAllElements('.savannah__answer-btn')[i].textContent = item.word;
                this.getAllElements('.savannah__answer-btn')[i].setAttribute('data-id', item.id);
            });
        } else {
            return false;
        }
        

        const questionWord = result[getRandomInt(result.length)];
        const TRANASLATE_URL = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200322T155651Z.de98a60e6a99185e.089aea4237b51c6db082c966f27a7895cd1e8b44&text=${questionWord.word}&lang=ru`;
        gameQuestionWord.setAttribute('translate', questionWord.word);

        fetch(TRANASLATE_URL)
                .then(res => res.json())
                .then(data => gameQuestionWord.textContent = data.text[0]);

        return [];
    }

    createHpBar(amount) {
        this.getElement('#game-hp-bar').innerHTML = '';

        for (let i = 0; i < amount; i += 1) {
            const gameHpItem = this.createElement({ node: 'div', styleName: 'savannah__hp-bar-item' });
            this.getElement('#game-hp-bar').append(gameHpItem);
        }
    }

    updateCrystal(status) {
        if (status) {
            this.getElement('#game-shot-item').classList.add('savannah__game-shot-item--success');
            setTimeout(() => {
                this.getElement('#game-shot-item').classList.remove('savannah__game-shot-item--success');
            }, 500);
        } else {
            this.getElement('#game-shot-item').classList.add('savannah__game-shot-item--miss');
            setTimeout(() => {
                this.getElement('#game-shot-item').classList.remove('savannah__game-shot-item--miss');
            }, 500);
        }
    }

    createElement(options) {
        const el = document.createElement(options.node);
        el.className = options.styleName || '';
        el.setAttribute('id', options.id || '');
        return el || this.app;
    }

    getElement(selector) {
        const el = document.querySelector(selector);
        return el || this.app;
    }

    getAllElements(selector) {
        const el = document.querySelectorAll(selector);
        return el || this.app;
    }
}

export default View;