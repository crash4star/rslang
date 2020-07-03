import addElement from '../utils/utils'

const body = document.querySelector('body');

export default function renderMainPage() {
    addElement('h1', body, null, null, 'There is the main page');
}
