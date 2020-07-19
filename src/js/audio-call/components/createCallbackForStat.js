import Words from '../../models/Words';
import AuthRequest from '../../models/AuthRequest';
import Api from '../../models/Api';
import AudioCallControllerApp from '../audio-call.ControllerApp';
import AudioCallView from '../audio-call.View';
import ViewMethods from '../../utils/view-methods';

function createCallback() {
  const rootBlock = document.querySelector('.root');
  rootBlock.classList.add('root-active');
  const BASE_HEROKU = 'https://afternoon-falls-25894.herokuapp.com';
  const app = new AudioCallControllerApp(
    new Words(new Api(BASE_HEROKU), new AuthRequest(new Api(BASE_HEROKU))),
    new AudioCallView(new ViewMethods()),
    new ViewMethods()
  );
  new AudioCallView(new ViewMethods()).createStartPage();
  const startBtn = document.querySelector('.startBtn');
  const startBtnLearnedWordsMode = document.querySelector(
    '.startBtnlearnedWords'
  );

  startBtn.onclick = () => {
    document.querySelector('.wrapperForStartPage').remove();
    app.start();
  };
  startBtnLearnedWordsMode.onclick = () => {
    document.querySelector('.wrapperForStartPage').remove();
    app.startLearnedWordsMode();
  };
}

export default createCallback;
