import Words from '../../models/Words';
import AuthRequest from '../../models/AuthRequest';
import Api from '../../models/Api';
import OwnGameControllerApp from '../own-game.ControllerApp';
import OwnGameView from '../own-game.View';
import ViewMethods from '../../utils/view-methods';

function createCallbackOwnGame() {
  const BASE_HEROKU = 'https://afternoon-falls-25894.herokuapp.com';
  const rootBlock = document.querySelector('.root');
  rootBlock.classList.add('root-active');
  const app = new OwnGameControllerApp(
    new Words(new Api(BASE_HEROKU), new AuthRequest(new Api(BASE_HEROKU))),
    new OwnGameView(new ViewMethods()),
    new ViewMethods()
  );
  app.renderStartPage();
  const startBtn = document.querySelector('.ownGame-startBtn');
  startBtn.onclick = () => {
    document.querySelector('.ownGame-startPage-container').remove();
    app.start();
  };
}

export default createCallbackOwnGame;
