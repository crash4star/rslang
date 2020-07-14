import Model from './js/Model/Model';
import Settings from './js/Model/Settings';
import Words from './js/Model/Words';
import Painting from './js/Model/Painting';
import View from './js/View/View';
import Favicon from './js/View/Favicon';
import MainPage from './js/View/MainPage';
import ControlPanel from './js/View/ControlPanel';
import HintsPanel from './js/View/HintsPanel';
import PuzzlePanel from './js/View/PuzzlePanel';
import PhrasePanel from './js/View/PhrasePanel';
import Controller from './js/Controller/Controller';
import Statistic from './js/Model/Statistic';

function startApp() {
  const model = new Model(new Settings(), new Words(), new Painting(), new Statistic());
  const view = new View(new Favicon(), new MainPage(), new ControlPanel(),
    new HintsPanel(), new PuzzlePanel(), new PhrasePanel());
  const app = new Controller(model, view);

  return app;
}

export { startApp };
