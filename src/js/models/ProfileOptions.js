<<<<<<< HEAD
import AuthRequest from './AuthRequest';

class ProfileOptions {
    constructor(api) {
        this.api = api;
        this.request = new AuthRequest(this.api);
=======
class ProfileOptions {
    constructor(api, request) {
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

    setUserTheme(theme) {
        const URL = `/users/${this.optionsData.userId}/settings`;
        
        this.request.get(URL).then(data => {
            const currentSettings = data;
            currentSettings.optional.settingsProfile.theme = theme;
            delete currentSettings.id;
            return currentSettings;
        }).then(update => {
            this.request.put(URL, update);
        });
    }

    setUserDifficult(difficult) {
        const URL = `/users/${this.optionsData.userId}/settings`;
        
        this.request.get(URL).then(data => {
            const currentSettings = data;
            currentSettings.optional.settingsProfile.difficult = difficult;
            delete currentSettings.id;
            return currentSettings;
        }).then(update => {
            this.request.put(URL, update);
        });
    }

}

export default ProfileOptions;