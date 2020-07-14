import { showErrorMessage } from '../../utils/message';

class DictionaryController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.app = this.view.getElement('.root');
        this.view.renderFilter();
        this.filterBtnController();
    }

    filterBtnController() {
        const wrapperCard = this.view.createlement({ node: 'div', styleName: 'dictionary-word-filter', id: 'dictionary-word-wrapper-card' });
        this.view.getElement('.main .container').append(wrapperCard);

        const btn = this.view.getAllElements('.dictionary-word-filter-btn');
        this.wordsFilter(btn[0].getAttribute('id'));

        btn.forEach(item => {
            item.addEventListener('click', () => {
                btn.forEach(el => el.classList.remove('dictionary-word-filter-btn--active'));
                item.classList.add('dictionary-word-filter-btn--active');
                this.wordsFilter(item.getAttribute('id'));
            });
        });
    }

    wordsFilter(filter) {
        const result = [];
        this.view.getElement('.main .container').classList.add('dictionary-load');
        this.model.getUserWords().then(data => {
            data.forEach(wordItem => {
                if (wordItem.optional[filter] !== undefined && filter === 'interval' && wordItem.optional[filter] === 1) {
                    result.push(wordItem);
                } else if (wordItem.optional[filter] !== undefined && filter === 'deleted' && wordItem.optional[filter] === true) {
                    result.push(wordItem);
                } else if (wordItem.optional[filter] !== undefined && filter === 'special' && typeof wordItem.optional[filter] === 'string') {
                    result.push(wordItem);
                } else if (filter === 'studied') {
                    result.push(wordItem);
                } 
            });
        }).then(() => {
            this.view.getElement('.main .container').classList.remove('dictionary-load');
            this.view.getElement('#dictionary-word-wrapper-card').innerHTML = '';
            if (result.length === 0) {
                showErrorMessage('No words found for this category');
            } else {
                result.forEach(word => {
                    this.view.renderCards(word.optional);
                });
            }
        });
    }
}

export default DictionaryController;
