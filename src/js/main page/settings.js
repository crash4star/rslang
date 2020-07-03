import addElement from '../utils/utils';
import { settings } from '../data/defaultSettings';

const body = document.querySelector('body');

function changeToggler(event, id) {
    if (event.target.closest('.toggle')) {
        const parent = document.querySelector(`#${id}`).querySelector('.toggle');
        const theme = parent.classList.contains('off') ? 'light' : 'dark';
        console.log(theme);
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
    // const theme = addElement('input', formGroup, null, null, null, ['type', 'checkbox'], ['data-toggle', 'toggle'], ['data-on', 'Light'], ['data-onstyle', 'light'], ['data-off', 'Dark'], ['data-offstyle', 'dark'], ['checked'], ['data-width', '100']);
    // theme.addEventListener('click', () => {
    //     console.log('theme');
    // })


    addElement('label', switcher, 'description', null, 'theme');
    addElement(
        'input', 
        switcher, 
        null, 
        'toggle-event', 
        null, 
        ['type', 'checkbox'], 
        ['data-toggle', 'toggle'], 
        ['data-width', '100'], 
        ['checked', 'checked'],
        ['data-onstyle', 'light'],
        ['data-offstyle', 'dark'],
        ['data-on', 'Light'],
        ['data-off', 'Dark'],
    );

    switcher.addEventListener('click', (event) => changeToggler(event, 'theme'));

    const formGroup = addElement('div', form, 'form-group');
    addElement('label', formGroup, null, null, "Difficult:", ['for', 'difficultLevel']);
    const slider = addElement('input', formGroup, 'form-control-range bg-gradient-danger', 'difficultLevel', null, ['type', 'range'], ['min', settings.difficult.minLevel], ['step', settings.difficult.step], ['max', settings.difficult.totalLevels], ['value', settings.difficult.defaultLevel]);
    const level = addElement('small', formGroup, 'form-text text-muted', null, `level: ${settings.difficult.defaultLevel}`);
    slider.addEventListener('mousemove', () => {
        level.innerText = `level: ${slider.value}`;
    });
}


