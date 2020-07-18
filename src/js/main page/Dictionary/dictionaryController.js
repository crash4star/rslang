import { showErrorMessage, showSuccessMessage } from '../../utils/message';
import Words from '../../models/Words';
import UserWord from '../../utils/UserWord';
import AuthRequest from '../../models/AuthRequest';

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
        this.view.getElement('#play').textContent = `Play ${btn[0].textContent.toLowerCase()} words`;

        btn.forEach(item => {
            item.addEventListener('click', () => {
                btn.forEach(el => el.classList.remove('dictionary-word-filter-btn--active'));
                item.classList.add('dictionary-word-filter-btn--active');
                this.wordsFilter(item.getAttribute('id'));
                this.view.getElement('#play').textContent = `Play ${item.textContent.toLowerCase()} words`;
            });
        });
    }

    restoreWord() {
        const btn = this.view.getAllElements('.dictionary-restore-btn');

        btn.forEach(item => {
            item.addEventListener('click', () => {
                const word = new Words(this.model.api, new AuthRequest(this.model.api));
                word.getUserWords().then(data => {
                    data.forEach(dbWord => {
                        if (dbWord.id === item.getAttribute('id')) {
                            const setWord = new UserWord(dbWord, false);
                            const formatedWord = setWord.getUserWord();
                            const req = new AuthRequest(this.model.api);
                            const urlSend = `/users/${localStorage.getItem('userId')}/words/${setWord.id}`;
                            formatedWord.optional.deleted = false;
                            formatedWord.optional.interval = 5;
                            formatedWord.optional.special = false;
                            req.put(urlSend, formatedWord);
                            showSuccessMessage('Word successfully recovered!');
                            
                            const btnFilter = this.view.getAllElements('.dictionary-word-filter-btn');
                            btnFilter.forEach(btnFilterItem => {
                                if (btnFilterItem.classList.contains('dictionary-word-filter-btn--active')) {
                                    this.view.getElement('#dictionary-word-wrapper-card').innerHTML = '';
                                    this.wordsFilter(btnFilterItem.getAttribute('id'));
                                }
                            });
                        }
                    });
                });
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
                    this.view.renderCards(word.optional, word.id);
                });
            }
            this.restoreWord();
        });
    }
}

export default DictionaryController;
