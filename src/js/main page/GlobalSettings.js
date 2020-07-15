import addElement from '../utils/utils';
import { showSuccessMessage } from '../utils/message';

const body = document.querySelector('body');
const togglerScriptURL = 'https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js';

export default class GlobalSettings {
    constructor(settings) {
        this.settings = settings;
        this.totalLevels = 6;
        this.minLevel = 1;
        this.step = 1;
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

    renderDifficultLevelSlider() {
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
            return this.settings.resetSettings().then(() => this.getSettingsFromDB());
        }
        return null;
    }

    loadScriptForToggler() {
        addElement('script', 
            body, 
            null, 
            null,
            null, 
            ['src' , togglerScriptURL]
        );
    }

    async init () {
        await this.getSettingsFromDB()
        .then(() => this.createObjectInDbIfNeed())
        .then(() => {
            this.renderSettingsForm();
            this.renderThemeSwitcher();
            this.renderDifficultLevelSlider();
            this.loadScriptForToggler();
        });
    }
}