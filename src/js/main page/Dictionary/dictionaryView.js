import {getDateInString} from '../../utils/utils'

class DictionaryView {
    constructor() {
        this.app = this.getElement('.main .container');
    }

    renderFilter() {
        const wrapper = this.createlement({ node: 'div', styleName: 'dictionary-word-filter', id: 'dictionary-word-filter' });
        const btnStudied = this.createlement({ node: 'button', styleName: 'dictionary-word-filter-btn', id: 'studied' });
        const btnHard = this.createlement({ node: 'button', styleName: 'dictionary-word-filter-btn', id: 'interval' });
        const btnRemoved = this.createlement({ node: 'button', styleName: 'dictionary-word-filter-btn', id: 'deleted' });
        const btnSpecial = this.createlement({ node: 'button', styleName: 'dictionary-word-filter-btn', id: 'special' });
        const btnPlay = this.createlement({ node: 'button', styleName: 'dictionary-word-filter-play-btn', id: 'play' });

        btnStudied.textContent = 'Studied';
        btnHard.textContent = 'Hard';
        btnRemoved.textContent = 'Removed';
        btnSpecial.textContent = 'Special';

        wrapper.append(btnStudied, btnHard, btnRemoved, btnSpecial, btnPlay);
        this.app.append(wrapper);
        this.getAllElements(`.dictionary-word-filter-btn`)[0].classList.add('dictionary-word-filter-btn--active');
    }

    renderCards(data, setId) {
        this.getElement('#dictionary-word-wrapper-card').classList.add('dictionary-wrapper');

        const card = this.createlement({ node: 'div', styleName: 'dictionary-word-card' });
        const topBlock = this.createlement({ node: 'div', styleName: 'dictionary-top-block' });
        const wordWithAudioBlock = this.createlement({ node: 'div', styleName: 'dictionary-word-audio-block' });
        const word = this.createlement({ node: 'p', styleName: 'dictionary-word', id: setId});
        word.textContent = data.word;
        const wordAudioBtn = this.createlement({ node: 'button', styleName: 'dictionary-word-audio-btn', id: data.wordId });

        wordWithAudioBlock.append(wordAudioBtn);
        wordWithAudioBlock.append(word);

        const wordTranslateTranscriptionBlock = this.createlement({ node: 'div', styleName: 'dictionary-translate-transcription-block' });
        const wordTranslate = this.createlement({ node: 'div', styleName: 'dictionary-translate' });
        wordTranslate.textContent = data.wordTranslate;
        const wordTranscription = this.createlement({ node: 'div', styleName: 'dictionary-transcription' });
        wordTranscription.textContent = data.transcription;

        wordTranslateTranscriptionBlock.append(wordTranslate);
        wordTranslateTranscriptionBlock.append(wordTranscription);

        const restoreBtn = this.createlement({ node: 'button', styleName: 'dictionary-restore-btn', id: setId });
        restoreBtn.textContent = 'Restore';

        topBlock.append(restoreBtn);
        topBlock.append(wordWithAudioBlock);
        topBlock.append(wordTranslateTranscriptionBlock);

        const downBlock = this.createlement({ node: 'div', styleName: 'dictionary-down-block' });
        const exampleBlock = this.createlement({ node: 'div', styleName: 'dictionary-example' });
        exampleBlock.innerHTML = data.textExample;
        const meaningBlock = this.createlement({ node: 'div', styleName: 'dictionary-meaning' });
        meaningBlock.innerHTML = data.textMeaning;

        downBlock.append(exampleBlock);
        downBlock.append(meaningBlock);

        const statisticWordBlock = this.createlement({ node: 'div', styleName: 'dictionary-statistic-block' });
        const statisticRepeated = this.createlement({ node: 'div', styleName: 'dictionary-repeated' });
        statisticRepeated.textContent = data.total;
        const statisticLastRepeat = this.createlement({ node: 'div', styleName: 'dictionary-last-repeat' });
        statisticLastRepeat.textContent = getDateInString(new Date(data.date));
        const statisticNextRepeat = this.createlement({ node: 'div', styleName: 'dictionary-next-repeat' });
        statisticNextRepeat.textContent = getDateInString(new Date(data.dateInterval));

        statisticWordBlock.append(statisticRepeated);
        statisticWordBlock.append(statisticLastRepeat);
        statisticWordBlock.append(statisticNextRepeat);

        card.append(topBlock);
        card.append(downBlock);
        card.append(statisticWordBlock);

        this.getElement('#dictionary-word-wrapper-card').append(card);
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

    getAllElements(selector) {
        const el = document.querySelectorAll(selector);
        return el || this.app;
    }
}

export default DictionaryView;