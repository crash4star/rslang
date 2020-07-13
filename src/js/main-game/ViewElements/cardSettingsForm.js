import FormElement from '../UIComponents/FormElement';
import LabelElement from '../UIComponents/LabelElement';
import GeneralContainerElement from '../UIComponents/GeneralContainerElement';
import ButtonElement from '../UIComponents/ButtonElement';
import InputFormElement from '../UIComponents/InputFormElement';

const cardSettingsForm = new FormElement('cardSettingsForm');
cardSettingsForm.addStyles('modal', 'fade');
cardSettingsForm.addAttribute('tabindex', "-1");
cardSettingsForm.addAttribute('role', "dialog");
cardSettingsForm.addAttribute('aria-hidden', "true");
cardSettingsForm.addAttribute('aria-labelledby', "mainModalLabel");

const cardModalDialog = new GeneralContainerElement('div', 'cardModalDialog');
cardModalDialog.addStyles('modal-dialog');
cardSettingsForm.addChildren(cardModalDialog);

const cardModalContent = new GeneralContainerElement('div', 'cardModalContent');
cardModalContent.addStyles('modal-content');
cardModalDialog.addChildren(cardModalContent);

const cardModalHeader = new GeneralContainerElement('div', 'cardModalHeader');
cardModalHeader.addHTML('<h5 class="modal-title" id="mainModalLabel">Options</h5>');
cardModalHeader.addStyles('modal-header');

const cardModalBody = new GeneralContainerElement('div', 'cardModalBody');
cardModalBody.addStyles('modal-body');

const fieldOfTips = new GeneralContainerElement('fieldset', 'fieldOfTips');
const legendTips = new GeneralContainerElement('legend', '');
legendTips.addHTML('Tips');
fieldOfTips.addChildren(legendTips);

const showTranslateWord = new InputFormElement('showTranslateWord', 'checkbox');
showTranslateWord.addAttribute('data-settings', 'showTranslateWord');
const labelTranslateWord = new LabelElement('labelTranslateWord', 'Show translation of word', showTranslateWord);

const showExampleSentence = new InputFormElement('showExampleSentence', 'checkbox');
showExampleSentence.addAttribute('data-settings', 'showExampleSentence');
const labelExampleSentence = new LabelElement('labelExampleSentence', 'Show an example of using word', showExampleSentence);

const showExplanationSentence = new InputFormElement('showExplanationSentence', 'checkbox');
showExplanationSentence.addAttribute('data-settings', 'showExplanationSentence');
const labelExplanationSentence = new LabelElement('labelExplanationSentence', 'Show an explanation of word', showExplanationSentence);


const showImage = new InputFormElement('showImage', 'checkbox');
showImage.addAttribute('data-settings', 'showImage');
const labelImage = new LabelElement('labelImage', 'Show image', showImage);

const showTranscription = new InputFormElement('showTranscription', 'checkbox');
showTranscription.addAttribute('data-settings', 'showTranscription');
const labelTranscription = new LabelElement('labelTranscription', 'Show transcription of word', showTranscription);

fieldOfTips.addChildren(labelTranslateWord, labelExampleSentence, labelExplanationSentence, labelImage, labelTranscription);

const fieldAudio = new GeneralContainerElement('fieldset', 'fieldAudio');
const legendAudio = new GeneralContainerElement('legend', '');
legendAudio.addHTML('Audio');
fieldAudio.addChildren(legendAudio);

const addAudioWord = new InputFormElement('addAudioWord', 'checkbox');
addAudioWord.addAttribute('data-settings', 'addAudioWord');
const labelAudioWord = new LabelElement('labelAudioWord', `Play word pronunciation`, addAudioWord);

const addAudioExample = new InputFormElement('addAudioExample', 'checkbox');
addAudioExample.addAttribute('data-settings', 'addAudioExample');
const labelAudioExample = new LabelElement('labelAudioExample', `Play an example of using word pronunciation`,addAudioExample);

const addAudioExplanation = new InputFormElement('addAudioExplanation', 'checkbox');
addAudioExplanation.addAttribute('data-settings', 'addAudioExplanation');
const labelAudioExplanation = new LabelElement('labelAudioExplanation', `Play an explanation of using word pronunciation`, addAudioExplanation);

fieldAudio.addChildren(labelAudioWord, labelAudioExample, labelAudioExplanation);

const fieldTranslation = new GeneralContainerElement('fieldset', 'fieldTranslation');
const legendTranslation = new GeneralContainerElement('legend', '');
legendTranslation.addHTML('Translation after check');
fieldTranslation.addChildren(legendTranslation);

const showWordTranslationAfter = new InputFormElement('showWordTranslationAfter', 'checkbox');
showWordTranslationAfter.addAttribute('data-settings', 'showWordTranslationAfter');
const labelWordTranslationAfter = new LabelElement('labelWordTranslationAfter', `Show word translation`, showWordTranslationAfter);

const showExampleTranslationAfter = new InputFormElement('showExampleTranslationAfter', 'checkbox');
showExampleTranslationAfter.addAttribute('data-settings', 'showExampleTranslationAfter');
const labelExampleTranslationAfter = new LabelElement('labelExampleTranslationAfter', 'Show an example of using word', showExampleTranslationAfter);

const showExplanationTranslationAfter = new InputFormElement('showExplanationTranslationAfter', 'checkbox');
showExplanationTranslationAfter.addAttribute('data-settings', 'showExplanationTranslationAfter');
const labelExplanationTranslationAfter = new LabelElement('labelExplanationTranslationAfter', 'Show an explanation of using word', showExplanationTranslationAfter);

fieldTranslation.addChildren(labelWordTranslationAfter, labelExampleTranslationAfter, labelExplanationTranslationAfter);

const fieldButtons = new GeneralContainerElement('fieldset', 'fieldButtons');
const legendButtons = new GeneralContainerElement('legend', '');
legendButtons.addHTML('Control buttons');
fieldButtons.addChildren(legendButtons);

const addAnswerBtns = new InputFormElement('addAnswerBtns', 'checkbox');
addAnswerBtns.addAttribute('data-settings', 'addAnswerBtns');
const labelAnswerBtns = new LabelElement('labelAnswerBtns', `Add "I know", "I don't know" buttons`, addAnswerBtns);

const addIntervalBtns = new InputFormElement('addIntervalBtns', 'checkbox');
addIntervalBtns.addAttribute('data-settings', 'addIntervalBtns');
const labelIntervalBtns = new LabelElement('labelIntervalBtns', `Add spaced repetition buttons`, addIntervalBtns);

const addDeleteBtn = new InputFormElement('addDeleteBtn', 'checkbox');
addDeleteBtn.addAttribute('data-settings', 'addDeleteBtn');
const labelDeleteBtn = new LabelElement('labelDeleteBtn', `Add "Remove from study" button`, addDeleteBtn);

const addSpecialBtn = new InputFormElement('addSpecialBtn', 'checkbox');
addSpecialBtn.addAttribute('data-settings', 'addSpecialBtn');
const labelSpecialBtn = new LabelElement('labelSpecialBtn', `Add "Tick as 'special'" button`, addSpecialBtn);

fieldButtons.addChildren(labelAnswerBtns, labelIntervalBtns, labelDeleteBtn, labelSpecialBtn);

const cardMessage = new GeneralContainerElement('p', 'error-message');
fieldOfTips.addStyles('flex-column');
fieldAudio.addStyles('flex-column');
fieldTranslation.addStyles('flex-column');
fieldButtons.addStyles('flex-column');
cardMessage.addStyles('flex-column');

cardModalBody.addChildren(fieldOfTips, fieldAudio, fieldTranslation, fieldButtons, cardMessage);

const cardModalFooter = new GeneralContainerElement('div', 'cardModalFooter');
cardModalFooter.addStyles('modal-footer');

const cardSaveSettingsBtn = new ButtonElement('cardSaveSettingsBtn', 'Save', 'submit');
cardSaveSettingsBtn.addStyles('btn', 'btn-primary');
const cardCloseSettingsBtn = new ButtonElement('cardCloseSettingsBtn', 'Close');
cardCloseSettingsBtn.addStyles('btn', 'btn-secondary');
cardCloseSettingsBtn.addAttribute('data-dismiss', "modal");
cardModalFooter.addChildren(cardCloseSettingsBtn, cardSaveSettingsBtn);

cardModalContent.addChildren(cardModalHeader, cardModalBody, cardModalFooter);

export default cardSettingsForm;