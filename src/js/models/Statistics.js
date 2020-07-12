<<<<<<< HEAD
import AuthRequest from './AuthRequest';

class Statistics {
    constructor(api) {
        this.api = api;
        this.request = new AuthRequest(this.api);
=======
import { showErrorMessage } from '../utils/message';

class Statistics {
    constructor(api,request) {
        this.api = api;
        this.request = request;
>>>>>>> savannah
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
<<<<<<< HEAD
            console.log(e);
        }

        return 'connection problem';
=======
            showErrorMessage(e);
        }

        return showErrorMessage('connection problem');
>>>>>>> savannah
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
<<<<<<< HEAD
            console.log(e);
=======
            showErrorMessage(e);
>>>>>>> savannah
        }

        return [];
    }
}

export default Statistics;