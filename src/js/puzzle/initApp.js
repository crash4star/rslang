// import ServerSettings from '../../models/Settings'; new ServerSettings()
import AuthRequest from '../models/AuthRequest';
import Api from '../models/Api';
// import BackendWords from '../models/Words';
import BackendSettings from '../models/Settings';
import DBWords from '../models/Words';
import Model from './Model/Model';
import Settings from './Model/Settings';
import Words from './Model/Words';
import Painting from './Model/Painting';
import View from './View/View';
import Favicon from './View/components/Favicon';
import MainPage from './View/MainPage';
import ControlPanel from './View/ControlPanel';
import HintsPanel from './View/HintsPanel';
import PuzzlePanel from './View/PuzzlePanel';
import PhrasePanel from './View/PhrasePanel';
import Controller from './Controller/Controller';
import Statistic from './Model/Statistic';

const BASE_HEROKU = `https://afternoon-falls-25894.herokuapp.com`;

const api = new Api(BASE_HEROKU);
const request = new AuthRequest(api);

//const learning = new LearningModel(api, request);
//const words = new Words(api, request);
const settings = new BackendSettings(api, request);
const words = new DBWords(api, request);

function startApp() {
  const model = new Model(new Settings(settings), new Words(words), new Painting(), new Statistic());
  const view = new View(new Favicon(), new MainPage(), new ControlPanel(),
    new HintsPanel(), new PuzzlePanel(), new PhrasePanel());
  const app = new Controller(model, view);

  return app;
}

export default startApp;
