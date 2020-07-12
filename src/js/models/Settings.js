<<<<<<< HEAD
import AuthRequest from './AuthRequest';
import Statistics from './Statistics';

class Settings {
    constructor(api) {
        this.api = api;
        this.request = new AuthRequest(this.api);
=======
import Statistics from './Statistics';
import { showErrorMessage } from '../utils/message';
class Settings {
    constructor(api,request) {
        this.api = api;
        this.request = request;
        this.currentStatistic = new Statistics(this.api);
>>>>>>> savannah
    }

    get optionsData() {
        return {
            url: this.api.url,
            token: localStorage.getItem('token'),
            userId: localStorage.getItem('userId')
        }
    }

    getUserSettings() {
        try {
            return this.request.get(`/users/${this.optionsData.userId}/settings`);
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

    resetSettings() {
        const startObject = {
            optional: {
                settingsProfile: {
                    theme: 0,
                    difficult: 0
                },
                settingsWords: 0
            }
        };

        try {
            return this.request.put(`/users/${this.optionsData.userId}/settings`,startObject);

        } catch (e) {
<<<<<<< HEAD
            console.log(e);
=======
            showErrorMessage(e);
>>>>>>> savannah
        }

        return [];
    }

    createUserStartObject() {
<<<<<<< HEAD
        const currentStatistic = new Statistics(this.api);
        
        currentStatistic.getUserStatistics().then(data => {
=======
        this.currentStatistic.getUserStatistics().then(data => {
>>>>>>> savannah
            if (data.games === undefined) {
                currentStatistic.resetStatistics();
                this.resetSettings();
            }
        });
    }

    setUserWordsSettings(object) {
        const URL = `/users/${this.optionsData.userId}/settings`;
        this.request.get(URL).then(data => {
            const currentSettings = data;
            currentSettings.optional.settingsWords = object;
            delete currentSettings.id;
            return currentSettings;
        }).then(update => {
<<<<<<< HEAD
            this.request.put(URL, update);
=======
            this.request.get(URL, update);
>>>>>>> savannah
        });
    }
}

<<<<<<< HEAD
export default Settings;
=======
export default Settings;
>>>>>>> savannah
