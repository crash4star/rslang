class View {
    constructor(words) {
        this.app = this.getElement('#root');
        this.words = words;
    }

    render(words = []) {
        const wrapper = this.createlement({node: 'div', styleName: 'savannah__wrapper', id: 'savannah'});
        const gameInfo = this.createlement({node: 'div', styleName: 'savannah__game-info', id: 'savannah-game-info'});
        const gameViewport = this.createlement({node: 'div', styleName: 'savannah__game-viewport', id: 'savannah-game-viewport'});

        this.app.append(wrapper);
        this.getElement(`#${wrapper.id}`).append(gameInfo);
        this.getElement(`#${wrapper.id}`).append(gameViewport);

        const gameBar = this.createlement({node: 'div', styleName: 'savannah__game-bar', id: 'game-bar'});
        const gamebackToProfileBtn = this.createlement({node: 'button', styleName: 'savannah__back-to-profile-btn', id: 'back-to-profile-btn'});
        const gameHpWrapper = this.createlement({node: 'div', styleName: 'savannah__hp-bar', id: 'game-hp-bar'});
        const gameXpWrapper = this.createlement({node: 'div', styleName: 'savannah__xp-bar', id: 'game-xp-bar'});

        this.getElement(`#${gameInfo.id}`).append(gameBar);
        this.getElement(`#${gameBar.id}`).append(gamebackToProfileBtn);
        this.getElement(`#${gameBar.id}`).append(gameHpWrapper);
        this.getElement(`#${gameBar.id}`).append(gameXpWrapper);

        for (let i = 0; i < 5; i += 1) {
            const gameHpItem = this.createlement({node: 'div', styleName: 'savannah__hp-bar-item'});
            this.getElement(`#${gameHpWrapper.id}`).append(gameHpItem);
        }

        const gameXpCrystalIcon = this.createlement({node: 'div', styleName: 'savannah__xp-bar-crystal-icon'});
        const gameXpCrystaWrapper = this.createlement({node: 'div', styleName: 'savannah__xp-bar-crystal-wrapper', id: 'xp-bar-crystal-wrapper'});
        const gameXpCrystaRange = this.createlement({node: 'div', styleName: 'savannah__xp-bar-crystal-range', id: 'xp-bar-crystal-range'});
        const gameXpCrystaThumb = this.createlement({node: 'div', styleName: 'savannah__xp-bar-crystal-thumb', id: 'xp-bar-crystal-thumb'});

        this.getElement(`#${gameXpWrapper.id}`).append(gameXpCrystalIcon);
        this.getElement(`#${gameXpWrapper.id}`).append(gameXpCrystaWrapper);
        this.getElement(`#${gameXpCrystaWrapper.id}`).append(gameXpCrystaRange);
        this.getElement(`#${gameXpCrystaWrapper.id}`).append(gameXpCrystaThumb);

        const gameAnswerBar = this.createlement({node: 'div', styleName: 'savannah__answer-bar', id: 'game-answer-bar'});
        const gameQuestionWord = this.createlement({node: 'h2', styleName: 'savannah__question-word', id: 'game-question-word'});
        const gameAnswerBtnsWrapper = this.createlement({node: 'div', styleName: 'savannah__answer-btns-wrapper', id: 'answer-btns-wrapper'});

        this.getElement(`#${gameInfo.id}`).append(gameAnswerBar);
        this.getElement(`#${gameAnswerBar.id}`).append(gameQuestionWord);
        this.getElement(`#${gameAnswerBar.id}`).append(gameAnswerBtnsWrapper);

        words.forEach(item => {
            const gameAnswerBtn = this.createlement({node: 'button', styleName: 'savannah__answer-btn'});
            gameAnswerBtn.setAttribute('word', item);
            gameAnswerBtn.textContent = item;
            this.getElement(`#${gameAnswerBtnsWrapper.id}`).append(gameAnswerBtn);
        });

        const gameCrystalItem = this.createlement({node: 'div', styleName: 'savannah__game-crystal-item', id: 'game-crystal-item'});
        const gameShotItem = this.createlement({node: 'div', styleName: 'savannah__game-shot-item', id: 'game-shot-item'});

        this.getElement(`#${gameViewport.id}`).append(gameShotItem);
        this.getElement(`#${gameViewport.id}`).append(gameCrystalItem);
    }

    createlement(options) {
        const el = document.createElement(options.node);
        el.className = options.styleName || '';
        el.setAttribute('id', options.id || '');
        return el || this.app;
    }

    getElement(selector) {
        const el = document.querySelector(selector);
        return el || this.app;
    }
}

export default View;