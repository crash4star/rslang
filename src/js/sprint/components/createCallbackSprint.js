import Words from '../../models/Words';
import AuthRequest from '../../models/AuthRequest';
import Api from '../../models/Api';
import SprintControllerApp from '../sprint.ControllerApp';
import SprintView from '../sprint.View';
import ViewMethods from '../../utils/view-methods';

function createCallback() {
  const rootBlock = document.querySelector('.root');
  rootBlock.classList.add('root-active');
  const BASE_HEROKU = 'https://afternoon-falls-25894.herokuapp.com';
  const app = new SprintControllerApp(
    new Words(new Api(BASE_HEROKU), new AuthRequest(new Api(BASE_HEROKU))),
    new SprintView(new ViewMethods()),
    new ViewMethods()
  );
  app.start();
  const startBtn = document.querySelector('.sprint-startBtn');
  const startBtnForLearnedWords = document.querySelector(
    '.sprint-startBtnlearnedWords'
  );
  startBtn.onclick = () => {
    document.querySelector('.sprint-container').remove();
    app.play();
  };
  startBtnForLearnedWords.onclick = () => {
    document.querySelector('.sprint-container').remove();
    app.playLearnedWords();
  };
}

export default createCallback;
