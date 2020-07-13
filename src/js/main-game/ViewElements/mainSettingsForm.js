import FormElement from '../UIComponents/FormElement';
import LabelElement from '../UIComponents/LabelElement';
import GeneralContainerElement from '../UIComponents/GeneralContainerElement';
import ButtonElement from '../UIComponents/ButtonElement';
import SelectElement from '../UIComponents/SelectElement';
import InputFormElement from '../UIComponents/InputFormElement';
import {
  HARD_MIN,
  HARD_MAX,
  GOOD_MIN,
  GOOD_MAX,
  EASY_MIN,
  EASY_MAX,
  LEARNED_MIN,
  LEARNED_MAX,
  CARDS_MAX,
  WORDS_MAX
} from '../assets/CONST';

const mainSettingsForm = new FormElement('mainSettingsForm');
mainSettingsForm.addStyles('modal', 'fade');
mainSettingsForm.addAttribute('tabindex', "-1");
mainSettingsForm.addAttribute('role', "dialog");
mainSettingsForm.addAttribute('aria-hidden', "true");
mainSettingsForm.addAttribute('aria-labelledby', "mainModalLabel");

const mainModalDialog = new GeneralContainerElement('div', 'mainModalDialog');
mainModalDialog.addStyles('modal-dialog');
mainSettingsForm.addChildren(mainModalDialog);

const mainModalContent = new GeneralContainerElement('div', 'mainModalContent');
mainModalContent.addStyles('modal-content');
mainModalDialog.addChildren(mainModalContent);

const mainModalHeader = new GeneralContainerElement('div', 'mainModalHeader');
mainModalHeader.addHTML('<h5 class="modal-title" id="mainModalLabel">Options</h5>');
mainModalHeader.addStyles('modal-header');

const mainModalBody = new GeneralContainerElement('div', 'mainModalBody');
mainModalBody.addStyles('modal-body');

const fieldOfGeneralOpt = new GeneralContainerElement('fieldset', 'fieldOfGeneralOpt');
const legendGeneralOpt = new GeneralContainerElement('legend', '');
legendGeneralOpt.addHTML('Main');
fieldOfGeneralOpt.addChildren(legendGeneralOpt);

const wordsComposition = new SelectElement('wordsComposition');
wordsComposition.addOption('New words and learned', 'all');
wordsComposition.addOption('Only new words', 'new');
wordsComposition.addOption('Only learned words', 'learned');
wordsComposition.addAttribute('data-settings', 'wordsComposition');
const wordsLabel = new LabelElement('wordsLabel', 'Words to learn:  ', wordsComposition, true);

const wordsPerDay = new InputFormElement('wordsPerDay', 'number');
wordsPerDay.addAttribute('data-settings', 'wordsPerDay');
wordsPerDay.addAttribute('max', WORDS_MAX);
const labelWordsPerDay = new LabelElement('labelWordsPerDay', 'New words per day:  ', wordsPerDay, true);

const maxCardsPerDay = new InputFormElement('maxCardsPerDay', 'number');
maxCardsPerDay.addAttribute('data-settings', 'maxCardsPerDay');
maxCardsPerDay.addAttribute('max', CARDS_MAX);
const labelCardsPerDay = new LabelElement('labelCardsPerDay', 'Max cards per day:  ', maxCardsPerDay, true);

fieldOfGeneralOpt.addChildren(wordsLabel, labelWordsPerDay, labelCardsPerDay);
fieldOfGeneralOpt.addStyles('flex-column');

const fieldOfOtherOpt = new GeneralContainerElement('fieldset', 'fieldOfOtherOpt');
const legendOtherOpt = new GeneralContainerElement('legend', '');
fieldOfOtherOpt.addStyles('flex-column');
legendOtherOpt.addHTML('Other');

const hardInterval = new InputFormElement('hardInterval', 'number');
hardInterval.addAttribute('data-settings', 'hardInterval');
hardInterval.addAttribute('min', HARD_MIN);
hardInterval.addAttribute('max', HARD_MAX);
const labelHardInterval = new LabelElement('labelHardInterval', 'Hard interval:  ', hardInterval, true);
labelHardInterval.addHTML('  minutes');

const goodInterval = new InputFormElement('goodInterval', 'number');
goodInterval.addAttribute('data-settings', 'goodInterval');
goodInterval.addAttribute('min', GOOD_MIN);
goodInterval.addAttribute('max', GOOD_MAX);
const labelGoodInterval = new LabelElement('labelGoodInterval', 'Good interval:  ', goodInterval, true);
labelGoodInterval.addHTML('  hours');

const easyInterval = new InputFormElement('easyInterval', 'number');
easyInterval.addAttribute('data-settings', 'easyInterval');
easyInterval.addAttribute('min', EASY_MIN);
easyInterval.addAttribute('max', EASY_MAX);
const labelEasyInterval = new LabelElement('labelEasyInterval', 'Easy interval:  ', easyInterval, true);
labelEasyInterval.addHTML('  days');

const learnedInterval = new InputFormElement('learnedInterval', 'number');
learnedInterval.addAttribute('data-settings', 'learnedInterval');
learnedInterval.addAttribute('min', LEARNED_MIN);
learnedInterval.addAttribute('max', LEARNED_MAX);
const labelLearnedInterval = new LabelElement('labelLearnedInterval', 'Learned interval:  ', learnedInterval, true);
labelLearnedInterval.addHTML('  days');

fieldOfOtherOpt.addChildren(legendOtherOpt, labelHardInterval, labelGoodInterval, labelEasyInterval, labelLearnedInterval);
const mainMessage = new GeneralContainerElement('p', 'mainMessage');

mainModalBody.addChildren(fieldOfGeneralOpt, fieldOfOtherOpt, mainMessage);

const mainModalFooter = new GeneralContainerElement('div', 'mainModalFooter');
mainModalFooter.addStyles('modal-footer');

const mainSaveSettingsBtn = new ButtonElement('mainSaveSettingsBtn', 'Save');
mainSaveSettingsBtn.addStyles('btn', 'btn-primary');
const mainCloseSettingsBtn = new ButtonElement('mainCloseSettingsBtn', 'Close');
mainCloseSettingsBtn.addStyles('btn', 'btn-secondary');
mainCloseSettingsBtn.addAttribute('data-dismiss', 'modal');
mainModalFooter.addChildren(mainCloseSettingsBtn, mainSaveSettingsBtn);

mainModalContent.addChildren(mainModalHeader, mainModalBody, mainModalFooter);

export default mainSettingsForm;