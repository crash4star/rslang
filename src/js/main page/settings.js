import addElement from '../utils/utils';
import defaultSettings from '../data/defaultSettings';
import { showErrorMessage, showSuccessMessage } from '../utils/message';

const totalLevels = 6;
const minLevel = 1;
const step = 1;

const body = document.querySelector('body');

function changeToggler(event, id) {
    if (event.target.closest('.toggle')) {
        const parent = document.querySelector(`#${id}`).querySelector('.toggle');
        const theme = parent.classList.contains('off') ? 'light' : 'dark';
        showSuccessMessage(`Active theme is ${theme}`);
        showErrorMessage('It\'s necessary to update value at server and check if it changed');
    }
}

export default function renderSettings() {
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
    const form = addElement('form', modalBody);
    const switcher = addElement('div', form, 'form-group theme', 'theme');

    addElement('label', switcher, 'description', null, 'Theme');
    const isChecked = (defaultSettings.theme === 'light') ? ['checked', 'checked'] : '';
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
    
    

    switcher.addEventListener('click', (event) => {
        changeToggler(event, 'theme');
    });

    const formGroup = addElement('div', form, 'form-group');
    addElement('label', formGroup, null, null, "Difficult:", ['for', 'difficultLevel']);
    const slider = addElement(
        'input', 
        formGroup, 
        'form-control-range bg-gradient-danger', 
        'difficultLevel', 
        null, 
        ['type', 'range'], 
        ['min', minLevel], 
        ['step', step], 
        ['max', totalLevels], 
        ['value', defaultSettings.difficult],
    );
    const level = addElement('small', 
        formGroup, 
        'form-text text-muted', 
        null, 
        `level: ${defaultSettings.difficult}`,
    );
    slider.addEventListener('mousemove', () => {
        level.innerText = `level: ${slider.value}`;
    });

    slider.addEventListener('mouseup', () => {
        showSuccessMessage(`Select level ${slider.value}`);
        showErrorMessage('It\'s necessary to update value at server and check if it changed');
    });
}


