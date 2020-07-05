import AuthRequest from './AuthRequest';
import Statistics from './Statistics';

class Settings {
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

    getUserSettings() {
        try {
            return this.request.get(`/users/${this.optionsData.userId}/settings`);
        } catch (e) {
            console.log(e);
        }

        return 'connection problem';
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
            console.log(e);
        }

        return [];
    }

    createUserStartObject() {
        const currentStatistic = new Statistics(this.api);
        
        currentStatistic.getUserStatistics().then(data => {
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
            this.request.get(URL, update);
        });
    }
}

export default Settings;