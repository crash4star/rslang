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

    getWordsOfGroup(difficult, number) {
        try {
            return this.api.getRequest(`/words?group=${difficult}&wordsPerExampleSentenceLTE=20&wordsPerPage=${number}`);
  
        } catch (e) {
            showErrorMessage(e);

        }
  
        return [];
    }

    async checkUserWordById(wordId) {
        const URL = `/users/${this.optionsData.userId}/words/${wordId}`;
        const res = await this.request.getRawResponse(URL); 
        return res;
      }
  
    async updateUserWord(wordId, userWord) {
        const URL = `/users/${this.optionsData.userId}/words/${wordId}`;
        const data = await this.request.put(URL, userWord);
        return data.info;
        }
  
    async upsertUserWord(wordId, userWord) {
        const res = await this.checkUserWordById(wordId);
        if (res.ok) {
           this.updateUserWord(wordId, userWord);
        } else {
          this.createUserWord(wordId, userWord);
        }
        return userWord;
    }
}

export default Words;