import AuthRequest from './AuthRequest';

class Words {
    constructor(api) {
        this.api = api;
        this.request = new AuthRequest(this.api);
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
            console.log(e);
        }

        return [];
    }

    getWordsDetails(word) {
        try {
            return this.api.getRequest(`/api/public/v1/words/search?search=${word}`);
        } catch (e) {
            console.log(e);
        }

        return [];
    }

    getUserWords() {
        try {
            return this.request.get(`/users/${this.optionsData.userId}/words`);
        } catch (e) {
            console.log(e);
        }

        return [];
    }  

    createUserWord(wordId, word) {
        try {
            return this.request.post(`/users/${this.optionsData.userId}/words/${wordId}`, word);
            
        } catch (e) {
            console.log(e);
        }

        return [];
    }
}

export default Words;