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
    const heading = new Paragraph('heading', 'English Puzzle', 'heading');
    const gameInfo = new Paragraph('heading', 'lorum ipsum(how to play)', 'heading');
    const startButton = new Container('button-container', 'button-container');
    startButton.add(new Button('start-button', 'Start Game', {}, 'start-button'));
    this.mainPage.add(heading, gameInfo, startButton);
  }

  renderGamePage() {
    this.gamePage = new Container('game', 'game');
    const controlPanel = new Container('control', 'control');
    const backButton = new Container('button-container', 'button-container');
    backButton.add(new Button('back-button', 'Back', {}, 'back-button'));
    const wordInfo = new Paragraph('word', 'word - translation', 'word');
    const controls = new Container('options', 'options');
    controls.add(new Button('audio-button', 'on/of audio', {}, 'audio-button'),
    new Button('translation-button', 'on/of translation', {}, 'translation-button'),
    new Button('auto-audio-button', 'auto audio', {}, 'auto-audio-button'),
    new Button('image-button', 'show/hide image', {}, 'image-button'));
    const phraseControls = new Container('options', 'options');
    phraseControls.add(new Button('audio-translation', 'audio-translation', {}, 'audio-translation'),
    new Paragraph('phrase-translation', 'phrase-translation', 'phrase-translation'));
    controlPanel.add(backButton, wordInfo, controls, phraseControls);

    const gamePanel = new Container('game-panel', 'game-panel');
    gamePanel.add(new Paragraph('puzzle', 'Hello world', 'puzzle'));

    const controlGame = new Container('control-game', 'control-game');
    controlGame.add(new Paragraph('puzzle', 'Hello', 'puzzle'),
    new Paragraph('puzzle', 'world', 'puzzle'))
    controlGame.add(new Container('phrase-panel', 'phrase-panel'),
    new Button('dont-know', 'I don\'t know', {}, 'dont-know'),
    new Button('check', 'Check', {}, 'check'));
    this.gamePage.add(controlPanel, gamePanel, controlGame);
  }
}

export default UserInterface;
