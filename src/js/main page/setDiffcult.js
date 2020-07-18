import Settings from '../models/Settings';
import Api from '../models/Api';
import AuthRequest from '../models/AuthRequest';

function setDiffcult() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const apiUrl = 'https://afternoon-falls-25894.herokuapp.com';
            const settingsProfile = new Settings(new Api(apiUrl), new AuthRequest(new Api(apiUrl)));
            const rangeDifficult = document.querySelector('#difficultLevel');
            const descDifficult = document.querySelector('.form-text ');

            settingsProfile.getUserSettings().then(data => {
                rangeDifficult.value = data.optional.settingsProfile.difficult;
                descDifficult.textContent = `Level: ${data.optional.settingsProfile.difficult}`;
            });

            rangeDifficult.addEventListener('change', () => {
                settingsProfile.getUserSettings().then(data => {
                    const setUserSettings = data;
                    const req = new AuthRequest(new Api(apiUrl));
                    const userId = localStorage.getItem('userId');
                    setUserSettings.optional.settingsProfile.difficult = rangeDifficult.value;
                    delete setUserSettings.id;
                    req.put(`/users/${userId}/settings`, setUserSettings);
                });
            });
        }, 1000);
    });
}

export default setDiffcult;