import FormElement from '../UIComponents/FormElement';
import GeneralContainerElement from '../UIComponents/GeneralContainerElement';
import ButtonElement from '../UIComponents/ButtonElement';

const endModal = new FormElement('endModal');
endModal.addStyles('modal', 'fade');
endModal.addAttribute('tabindex', "-1");
endModal.addAttribute('role', "dialog");
endModal.addAttribute('aria-hidden', "true");
endModal.addAttribute('aria-labelledby', "mainModalLabel");

const endModalDialog = new GeneralContainerElement('div', 'endModalDialog');
endModalDialog.addStyles('modal-dialog');
endModal.addChildren(endModalDialog);

const endModalContent = new GeneralContainerElement('div', 'endModalContent');
endModalContent.addStyles('modal-content');
endModalDialog.addChildren(endModalContent);

const endModalHeader = new GeneralContainerElement('div', 'endModalHeader');
endModalHeader.addHTML('<h5 class="modal-title" id="endModalLabel">Congratulation!</h5>');
endModalHeader.addStyles('modal-header');


const endModalBody = new GeneralContainerElement('div', 'endModalBody');
endModalBody.addStyles('modal-body');


const endMessage = new GeneralContainerElement('p', 'end-message');
endMessage.addHTML('The daily norm has been completed.');


const cardsContainer = new GeneralContainerElement('p', 'cardsContainer');
const cardsNumber = new GeneralContainerElement('span', 'cardsPassed');
cardsNumber.addHTML('0');
cardsContainer.addHTML('<span>Passed cards:  </span>');
cardsContainer.addChildren(cardsNumber);

const wordsContainer = new GeneralContainerElement('p', 'wordsContainer');
const wordsNumber = new GeneralContainerElement('span', 'wordsPassed');
wordsNumber.addHTML('0');
wordsContainer.addHTML('<span>Passed new words:  </span>');
wordsContainer.addChildren(wordsNumber);

const percentageContainer = new GeneralContainerElement('p', 'percentageContainer');
const rightsPercentage = new GeneralContainerElement('span', 'rightsPercentage');
rightsPercentage.addHTML('0');
percentageContainer.addHTML('<span>Percentage of correct answers:  </span>');
percentageContainer.addChildren(rightsPercentage);
percentageContainer.addHTML('<span>  %</span>');

const setContainer = new GeneralContainerElement('p', 'setContainer ');
const setNumber = new GeneralContainerElement('span', 'setNumber');
setNumber.addHTML('0');
setContainer .addHTML('<span>The longest correct answers set:  </span>');
setContainer .addChildren(setNumber);

endModalBody.addChildren(endMessage, cardsContainer, wordsContainer, percentageContainer, setContainer );

const endModalFooter = new GeneralContainerElement('div', 'endModalFooter');
endModalFooter.addStyles('modal-footer');

const restartBtn = new ButtonElement('restartBtn', 'Restart', '');
restartBtn.addStyles('btn', 'btn-primary');
const finishBtn = new ButtonElement('finishBtn', 'Finish');
finishBtn.addStyles('btn', 'btn-secondary');
finishBtn.addAttribute('data-dismiss', "modal");
endModalFooter.addChildren(finishBtn, restartBtn);

endModalContent.addChildren(endModalHeader, endModalBody, endModalFooter);

export default endModal;