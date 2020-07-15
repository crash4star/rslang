import { showErrorMessage } from '../utils/message';

class Statistics {
    constructor(api,request) {
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

    getUserStatistics() {
        try {
            return this.request.get(`/users/${this.optionsData.userId}/statistics`);
        } catch (e) {
            showErrorMessage(e);
        }
        return showErrorMessage('connection problem');
    }

    resetStatistics() {
        const startObject = {
            optional: {
                games: {
                    sprint: {
                        settings: [],
                        logs: []
                    },
                    englishPuzzle: {
                        settings: [],
                        logs: []
                    },
                    audioCall: {
                        settings: [],
                        logs: []
                    },
                    linguist: {
                        settings: [],
                        logs: []
                    },
                    savannah: {
                        settings: [],
                        logs: []
                    },
                    speakIt: {
                        settings: [],
                        logs: []
                    }
                },
                createdWords: 0
            }
        };

        try {
            return this.request.put(`/users/${this.optionsData.userId}/statistics`, startObject);
        } catch (e) {
            showErrorMessage(e);
        }

        return [];
    }
}

export default Statistics;