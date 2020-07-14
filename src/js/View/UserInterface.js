import Favicon from './Favicon';
import Container from './Container';
import Button from './Button';
import Image from './Image';
import InputField from './InputField';
import Paragraph from './Paragraph';

class UserInterface {
  constructor() {
    // this.renderFavicon();
    this.renderMainPage();
    this.renderGamePage();
  }

  renderFavicon() {
    this.favicon = new Favicon('favicon', {
      type: 'image/x-icon',
      rel: 'shortcut icon',
      href: './assets/favicon.ico',
    });
  }

  renderMainPage() {
    this.mainPage = new Container('page', 'page');
    const closeButton = new Container('close-container', 'close-container');
    closeButton.add(new Image('close-button', {
      src: './img/close.svg',
    }, 'close-button'));
    const heading = new Paragraph('heading', 'English Puzzle', 'heading');
    const gameInfo = new Paragraph('info', 'lorum ipsum(how to play)', 'info');
    const startButton = new Container('button-container', 'start-container');
    startButton.add(new Button('start-button', 'Start Game', {}, 'start-button'));
    this.mainPage.add(closeButton, heading, gameInfo, startButton);
  }

  renderGamePage() {
    this.gamePage = new Container('game', 'game');
    const closeButton = new Container('close-game', 'close-game');
    closeButton.add(new Image('close-button', {
      src: './img/close.svg',
    }, 'close-button'));
    const controlPanel = new Container('control', 'control');
    controlPanel.add(closeButton);
    const settingsPanel = new Container('settings-game', 'settings-game');
    const optionsButton = new Container('option-game', 'option-game');
    optionsButton.add(new Image('option-button', {
      src: './img/cogwheel.svg',
    }, 'option-button'));
    const levelButton = new Container('level-game', 'level-game');
    levelButton.add(new Image('level-button', {
      src: './img/list.svg',
    }, 'level-button'));
    settingsPanel.add(levelButton, optionsButton);
    // const wordInfo = new Paragraph('word', 'word - translation', 'word');
    // const controls = new Container('options', 'options');
    // controls.add(new Button('audio-button', 'on/of audio', {}, 'audio-button'),
    // new Button('translation-button', 'on/of translation', {}, 'translation-button'),
    // new Button('auto-audio-button', 'auto audio', {}, 'auto-audio-button'),
    // new Button('image-button', 'show/hide image', {}, 'image-button'));
    // const phraseControls = new Container('options', 'options');
    // phraseControls.add(new Button('audio-translation', 'audio-translation', {}, 'audio-translation'),
    // new Paragraph('phrase-translation', 'phrase-translation', 'phrase-translation'));

    // const gamePanel = new Container('game-panel', 'game-panel');
    // gamePanel.add(new Paragraph('puzzle', 'Hello world', 'puzzle'));

    // const controlGame = new Container('control-game', 'control-game');
    // controlGame.add(new Paragraph('puzzle', 'Hello', 'puzzle'),
    // new Paragraph('puzzle', 'world', 'puzzle'))
    // controlGame.add(new Container('phrase-panel', 'phrase-panel'),
    // new Button('dont-know', 'I don\'t know', {}, 'dont-know'),
    // new Button('check', 'Check', {}, 'check'));
    // this.gamePage.add(controlPanel, gamePanel, controlGame);
    const level = new Container('level', 'level');
    const options = new Container('options', 'options');
    const menus = new Container('menus', 'menus');
    menus.add(level, options);
    this.gamePage.add(controlPanel, settingsPanel, menus);
  }
}

export default UserInterface;
