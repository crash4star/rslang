import '../../css/message.scss';
import addElement from "./utils";

let alertBlock;
let container;
const showMessageTimeout = 5000;
const hideMessageTimeout = 1000;
let counter = 0;

function showAlertBlock() {
    document.querySelector('.alert').classList.remove('hidden');
}

function hideAlertBlock() {
    document.querySelector('.alert').classList.add('hidden');
}

function removeMessage(textBlock) {
    setTimeout(() => {
        textBlock.classList.add('messageHide');
        setTimeout(() => {
            counter -= 1;
            textBlock.classList.remove('messageHide');
            textBlock.remove();
            if (!counter) {
                hideAlertBlock();
            }
        }, hideMessageTimeout);
    }, showMessageTimeout);
}

function showMessage(message, className) {
    if (!counter) {
        showAlertBlock();
    }
    counter += 1;
    alertBlock = document.querySelector('.alert');
    container = alertBlock.querySelector('.container');
    const textBlock = addElement('div', container, `alert-message ${className}`, null, message);
    removeMessage(textBlock);
    return textBlock;
}

function showErrorMessage(message) {
    showMessage(message, 'alert-danger');
}

function showSuccessMessage(message) {
    showMessage(message, 'alert-success');
}

export { showErrorMessage, showSuccessMessage }