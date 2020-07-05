import '../../css/message.scss';
import addElement from "./utils";

let alertBlock;
let container;
const showMessageTimeout = 5000;
const hideMessageTimeout = 1000;

function removeMessage(textBlock) {
    setTimeout(() => {
        textBlock.classList.add('messageHide');
        setTimeout(() => {
            textBlock.classList.remove('messageHide');
            textBlock.style.display = 'none';
            textBlock.remove();
        }, hideMessageTimeout);
    }, showMessageTimeout);
}

function showMessage(message, className) {
    alertBlock = document.querySelector('.alert');
    container = alertBlock.querySelector('.container');
    const textBlock = addElement('div', container, `alert-message ${className}`, null, message);
    alertBlock.style.display = 'block';
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