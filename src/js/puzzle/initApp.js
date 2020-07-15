// import ServerSettings from '../../models/Settings'; new ServerSettings()
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

function startApp() {
  const model = new Model(new Settings(), new Words(), new Painting(), new Statistic());
  const view = new View(new Favicon(), new MainPage(), new ControlPanel(),
    new HintsPanel(), new PuzzlePanel(), new PhrasePanel());
  const app = new Controller(model, view);

  return app;
}

export default startApp;
