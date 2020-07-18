import ControllerLinguist from './ControllerLinguist';
import ModelLinguist from './ModelLinguist';
import ViewLinguist from './ViewLinguist';

import mainSettingsBtn from './ViewElements/mainSettingsBtn';
import mainSettingsForm from './ViewElements/mainSettingsForm';
import cardSettingsBtn from './ViewElements/cardSettingsBtn';
import cardSettingsForm from './ViewElements/cardSettingsForm';
import endBtn from './ViewElements/endBtn';
import endModal from './ViewElements/endModal';

import AuthRequest from '../models/AuthRequest';
import Api from '../models/Api';
import Words from '../models/Words';
import Settings from '../models/Settings';
import LearningModel from '../models/LearningModel';
import shuffleArr from '../utils/shuffleArr';

const BASE_HEROKU = `https://afternoon-falls-25894.herokuapp.com`;

const api = new Api(BASE_HEROKU);
const request = new AuthRequest(api);

const learning = new LearningModel(api, request);
const words = new Words(api, request);
const settings = new Settings(api, request);

function mainGame(wordForTrain) {
     alert("Просим вас проверить нашу работу как можно позже. У нас выбыл один участник и нам нужно немного времени, чтобы запустить наше приложение в работу. Спасибо за понимание. Желаем вам удачи!");
    return new ControllerLinguist(new ViewLinguist(mainSettingsForm, mainSettingsBtn, cardSettingsForm, cardSettingsBtn, endModal, endBtn), new ModelLinguist(learning, words, settings), wordForTrain, shuffleArr);
}


export default mainGame;

