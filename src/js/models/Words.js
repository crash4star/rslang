import { showErrorMessage } from '../utils/message';

class Words {
    constructor(api, request) {
        this.api = api;
        this.request = request;

    }

    get optionsData() {
        return {
            url: this.api.url,
            token: localStorage.getItem('token'),
            userId: localStorage.getItem('userId')
        }
    }

    getWords(difficult, page) {
        try {
            return this.api.getRequest(`/words?page=${page}&group=${difficult}`);

        } catch (e) {
            return showErrorMessage(e);
        }

        return [];
    }

    getWordsDetails(word) {
        try {
            return this.api.getRequest(`/api/public/v1/words/search?search=${word}`);
        } catch (e) {
            return showErrorMessage(e);
        }

        return [];
    }

    getUserWords() {
        try {
            return this.request.get(`/users/${this.optionsData.userId}/words`);
        } catch (e) {
            return showErrorMessage(e);
        }

        return [];
    }  

    createUserWord(wordId, word) {
        try {
            return this.request.post(`/users/${this.optionsData.userId}/words/${wordId}`, word);
            
        } catch (e) {
            return showErrorMessage(e);
        }

        return [];
    }
}

export default Words;
