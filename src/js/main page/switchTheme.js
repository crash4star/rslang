import Settings from '../models/Settings';
import Api from '../models/Api';
import AuthRequest from '../models/AuthRequest';

function updateThemeDb(settingsProfile, apiUrl, theme) {
    settingsProfile.getUserSettings().then(data => {
        const setUserSettings = data;
        const req = new AuthRequest(new Api(apiUrl));
        const userId = localStorage.getItem('userId');
        const bodyBlock = document.querySelector('body');

        setUserSettings.optional.settingsProfile.theme = theme;
        delete setUserSettings.id;
        req.put(`/users/${userId}/settings`, setUserSettings);

        if (theme === 'dark') {
            bodyBlock.classList.add('dark-theme');
        } else {
            bodyBlock.classList.remove('dark-theme');
        }
    });
}

function switchThemeMode() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const apiUrl = 'https://afternoon-falls-25894.herokuapp.com';
            const settingsProfile = new Settings(new Api(apiUrl), new AuthRequest(new Api(apiUrl)));
            const switchThemeBtn = document.querySelector('.toggle');
            const bodyBlock = document.querySelector('body');

            settingsProfile.getUserSettings().then(data => {
                switchThemeBtn.classList.remove('btn-light');
                switchThemeBtn.classList.remove('btn-dark');
                switchThemeBtn.classList.add(`btn-${data.optional.settingsProfile.theme}`);
                switchThemeBtn.classList.add('off');

                if (data.optional.settingsProfile.theme === 'dark') {
                    bodyBlock.classList.add('dark-theme');
                } else {
                    switchThemeBtn.classList.remove('off');
                }
            });

            switchThemeBtn.addEventListener('click', () => {
                if (switchThemeBtn.classList.contains('btn-light')) {
                    updateThemeDb(settingsProfile, apiUrl, 'dark');
                } else {
                    updateThemeDb(settingsProfile, apiUrl, 'light');
                }
            });
        }, 1500);
    });
}

export default switchThemeMode;