import addElement from '../utils/utils';
import { showErrorMessage, showSuccessMessage } from '../utils/message';
import { BASE_HEROKU } from '../data/miniGames';
import Api from '../models/Api';
import AuthRequest from '../models/AuthRequest';
import Settings from '../models/Settings';

const body = document.querySelector('body');

export default class GlobalSettings {
    constructor() {
        this.totalLevels = 6;
        this.minLevel = 1;
        this.step = 1;
        this.settingsFromDB;
        this.theme;
        this.difficult;
        this.init();
    }

    renderSettingsForm() {
        const modalFade = addElement('div', body, 'modal fade', 'settings', null, ['role', 'dialog']);
        const modalDialog = addElement('div', modalFade, 'modal-dialog');
        const modalContent = addElement('div', modalDialog, 'modal-content');
        const modalHeader = addElement('div', modalContent, 'modal-header');
        addElement('h5', modalHeader, 'modal-title', 'ModalLabel', 'Settings');
        const closeButton = addElement(
            'button', 
            modalHeader, 
            'close', 
            null, 
            null, 
            ['data-dismiss', 'modal'], 
            ['aria-label', 'Close']
        );
        addElement('span', closeButton, null, null, '&times;', ['aria-hidden', 'true']);

        const modalBody = addElement('div', modalContent, 'modal-body');
        this.form = addElement('form', modalBody);
    }

    changeTheme(event, id) {
        if (event.target.closest('.toggle')) {
            const parent = document.querySelector(`#${id}`).querySelector('.toggle');
            const theme = parent.classList.contains('off') ? 'light' : 'dark';
            this.theme = theme;
            this.settingsFromDB.optional.settingsProfile.theme = theme;
            this.updateSettingsInDb();
        }
    }

    renderThemeSwitcher() {
        const switcher = addElement('div', this.form, 'form-group theme', 'theme');
        addElement('label', switcher, 'description', null, 'Theme');
        const isChecked = (this.theme === 'light') ? ['checked', 'checked'] : '';
        addElement(
            'input', 
            switcher, 
            null, 
            'toggle-event', 
            null, 
            ['type', 'checkbox'], 
            ['data-toggle', 'toggle'], 
            ['data-width', '100'], 
            ['data-onstyle', 'light'],
            ['data-offstyle', 'dark'],
            ['data-on', 'Light'],
            ['data-off', 'Dark'],
            isChecked,
        );
            switcher.addEventListener('click', (event) => this.changeTheme(event, 'theme'));
    }

    changeSlider(slider) {
        const difficult = slider.value;
        this.settingsFromDB.optional.settingsProfile.difficult = difficult;
        this.updateSettingsInDb();
    }

    renderDifficultSlider() {
        const formGroup = addElement('div', this.form, 'form-group');
        addElement('label', formGroup, null, null, "Difficult:", ['for', 'difficultLevel']);
        const slider = addElement(
            'input', 
            formGroup, 
            'form-control-range bg-gradient-danger', 
            'difficultLevel', 
            null, 
            ['type', 'range'], 
            ['min', this.minLevel], 
            ['step', this.step], 
            ['max', this.totalLevels], 
            ['value', Number(this.difficult)],
        );
        const level = addElement('small', 
            formGroup, 
            'form-text text-muted', 
            null, 
            `level: ${this.difficult}`,
        );

        slider.addEventListener('mousemove', () => {
            level.innerText = `level: ${slider.value}`;
        });

        slider.addEventListener('mouseup', () => {
            this.changeSlider(slider);
        });
    }

    async getSettingsFromDB() {
        this.settingsFromDB = await this.settings.getUserSettings()
        .then((result) => {
            this.difficult = result.optional.settingsProfile.difficult;
            this.theme = result.optional.settingsProfile.theme;
            return result;
        });
    }

    async updateSettingsInDbAndShowMessage(settings) {
        await this.updateSettingsInDb(settings).then(result => {
            showSuccessMessage('Settings is saved');

            showErrorMessage(`Something went wrong. Can't update settings in database`);
        })
    }

    async updateSettingsInDb() {
        const settings = {
            optional: this.settingsFromDB.optional
        }
        await this.settings.updateSettings(settings)
        .then (result => {
            if (result.status) {
                showSuccessMessage('Settings is updated')
            }
        });
    }

    async createObjectInDbIfNeed() {
        if (!this.settingsFromDB.optional || !this.settingsFromDB.optional.settingsProfile) {
            return await this.settings.resetSettings().then(() => this.getSettingsFromDB());
        }
    }

    loadScriptForToggler() {
        addElement('script', 
            body, 
            null, 
            null,
            null, 
            ['src' , 'https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js']
        );
    }

    async init () {
        this.api = new Api(BASE_HEROKU);
        this.authRequest = new AuthRequest(this.api);
        this.settings = new Settings(this.api, this.authRequest);
        await this.getSettingsFromDB()
        .then(() => this.createObjectInDbIfNeed())
        .then(() => {
            this.renderSettingsForm();
            this.renderThemeSwitcher();
            this.renderDifficultSlider();
            this.loadScriptForToggler();
        });
    }
}