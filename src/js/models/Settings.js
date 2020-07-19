import Statistics from './Statistics';
import defaultSettings from '../data/defaultSettings';

import { showErrorMessage } from '../utils/message';

class Settings {
    constructor(api,request) {
        this.api = api;
        this.request = request;
        this.currentStatistic = new Statistics(this.api);
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
            showErrorMessage(e);
        }

        return showErrorMessage('connection problem');
    }

    resetSettings() {
        const startObject = {
            optional: {
                settingsProfile: {
                    theme: defaultSettings.theme,
                    difficult: defaultSettings.difficult
                },
                settingsWords: 0
            }
        };

        updateSettings (startObject);
    }
    
    updateSettings (settings) {
        try {
            return this.request.put(`/users/${this.optionsData.userId}/settings`, settings);

        } catch (e) {
            showErrorMessage(e);
        }

        return [];
    }

    createUserStartObject() {
        this.currentStatistic.getUserStatistics().then(data => {
            if (data.games === undefined) {
                this.currentStatistic.resetStatistics();
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

    async getUserDifficultySettings() {
        const URL = `/users/${this.optionsData.userId}/settings`;
        const settings = await this.request.get(URL);
        return settings.optional.settingsProfile.difficult;
      }
}


export default Settings;