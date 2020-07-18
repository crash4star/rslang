import Words from '../../models/Words';
import Api from '../../models/Api';
import AuthRequest from '../../models/AuthRequest';
import UserWord from '../../utils/UserWord';
import Utils from '../Model/Utils';

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.startGameEvent(this.bindStartGame.bind(this));
    this.numberOfTurns = 9;
    this.currentTurn = 0;
    this.updateDB = false;
    this.url = 'https://afternoon-falls-25894.herokuapp.com';
    this.api = new Api(this.url);
    this.request = new AuthRequest(this.api);
  }

  async bindStartGame() {
    this.currentTurn = 0;
    this.currentSettings = await this.getCurrentSettings();
    this.view.controlPanel.updateControlPanel(this.currentSettings);
    this.words = await this.getWordsSet(this.currentSettings.levelSettings.level,
      this.currentSettings.levelSettings.page);
    this.currentPuzzle = this.model.paintings.getPainting(this.currentSettings.levelSettings.level,
    this.currentSettings.levelSettings.page);
    this.imgData = await this.view.getImageData(this.currentPuzzle);
    this.turn(this.words);
    this.view.gameEvents(this.checkEvent.bind(this), this.continueEvent.bind(this),
      this.getCurrentTurn.bind(this), this.dontKnowEvent.bind(this),
      this.showResultEvent.bind(this));
    this.view.controlPanelEvents(this.bindChangeSettingsEvent.bind(this),
      this.getIsPuzzleImageSetting.bind(this), this.getCurrentImage.bind(this),
      this.changeUserSettings.bind(this), this.bindStartGame.bind(this));
    this.view.resizeEvent(this.getCurrentImage.bind(this), this.getIsPuzzleImageSetting.bind(this));
  }

  changeUserSettings(option, value) {
    this.currentSettings.levelSettings = this.model.options.setUserSettings(option, value);
  }

  getIsPuzzleImageSetting() {
    return this.currentSettings.gameSettings.puzzleImage;
  }

  getCurrentImage() {
    return this.currentPuzzle;
  }

  getCurrentTurn() {
    return this.currentTurn;
  }

  showResultEvent() {
    if (this.currentTurn === this.numberOfTurns) {
      this.currentTurn += 1;
      this.view.phrasePanel.removeAllItems();
      this.view.puzzlePanel.removeAllLines();
      this.view.puzzlePanel.setBackground(this.currentPuzzle, this.imgData);
      const currentPuzzleInfo = this.model.paintings
        .getPaintingDescription(this.currentSettings.levelSettings.level,
          this.currentSettings.levelSettings.page);
      this.view.phrasePanel.showPaintingInfo(currentPuzzleInfo);
      return true;
    } else {
      this.view.showStatisticEvent(this.bindGetStatistic.bind(this), this.bindContinueGameEvent.bind(this),
        this.updateDbStatus.bind(this));
      return false;
    }
  }

  async updateDbStatus() {
    if (this.updateDB) {
      const toUpdateData = this.model.statistic.getStatistic().incorrect;
      const dataArray = [];
      this.wordsDB.forEach((element, index) => {
        if (toUpdateData.includes(element.optional.word)) {
          dataArray.push(element);
          delete dataArray[index].answerPhrase;
        }
      });
      // const send = new Words(this.api, this.request);
      // dataArray.forEach((element) => {
      //   const addNewWord = new UserWord(element, false);
      //   addNewWord.setImportant();
      //   const usrWord = addNewWord.getUserWord();
      //   send.upsertUserWord(addNewWord.id, usrWord);
      // });
    }
  }

  bindGetStatistic() {
    return this.model.statistic.getStatistic();
  }

  continueEvent() {
    if (this.currentTurn < this.numberOfTurns) {
      this.currentTurn += 1;
      this.turn(this.words);
      return true;
    }
    return false;
  }

  dontKnowEvent() {
    this.view.phrasePanel.removeAllItems();
    this.view.puzzlePanel.removeAllItems(this.currentTurn);
    this.view.phrasePanel.updatePhrasePanel(this.words, this.currentTurn, this.imgData,
      this.currentPuzzle, this.currentSettings.gameSettings.puzzleImage);
    const sortedItems = this.view.phrasePanel.sortItems();
    this.view.puzzlePanel.setElements(this.currentTurn, sortedItems);
    this.model.statistic.addIncorrectValue(this.words[this.currentTurn].word);
  }

  bindContinueGameEvent() {
    const maxLevel = 5;
    const maxRound = 10;
    this.currentSettings.levelSettings.page += 1;
    if (this.currentSettings.levelSettings.level === maxLevel && this.currentSettings.levelSettings.page === maxRound) {
      this.changeUserSettings('level', 0);
      this.changeUserSettings('page', 0);
    } else {
      if (this.currentSettings.levelSettings.page === maxRound) {
        this.changeUserSettings('level', this.currentSettings.levelSettings.level += 1);
        this.changeUserSettings('page', 0);
      } else {
        this.changeUserSettings('page', this.currentSettings.levelSettings.page);
      }
    }
  }

  checkEvent() {
    const lineData = this.view.puzzlePanel.getLineData(this.currentTurn);
    const marks = [];
    lineData.forEach((element, iterator) => {
      marks.push(element.index === iterator);
    });
    this.view.puzzlePanel.markCorrectsAndIncorrectsItems(marks, this.currentTurn);
    if (!marks.includes(false)) {
      this.model.statistic.addCorrectValue(this.words[this.currentTurn].word);
      return true;
    }
    this.model.statistic.addIncorrectValue(this.words[this.currentTurn].word);
    return false;
  }

  turn(words) {
    this.view.hintsPanel.updateHintsPanel(words[this.currentTurn].textExampleTranslate,
      words[this.currentTurn].audioExample);
    this.view.phrasePanel.updatePhrasePanel(words, this.currentTurn, this.imgData,
      this.currentPuzzle, this.currentSettings.gameSettings.puzzleImage);
    this.view.puzzlePanel.addLine(this.currentTurn);
    if (this.currentSettings.gameSettings.autoListen === true) {
      setTimeout(() => {
        this.view.hintsPanel.playSound();
      }, 100);
    }
    this.view.correctAnswerEvent(this.getCurrentTurn.bind(this));
  }

  async bindChangeSettingsEvent(optionId, value) {
    const optionsID = ['auto-wrapper', 'translation-wrapper', 'sound-wrapper', 'picture-wrapper'];
    const options = {
      0: 'autoListen',
      1: 'translation',
      2: 'listenSentence',
      3: 'puzzleImage',
    };
    this.model.options.setGameSettings(options[optionsID.indexOf(optionId)], value);
    this.currentSettings = await this.getCurrentSettings();
  }

  async bindGetLevel() {
    return this.model.options.getLevelSettings();
  }

  async getWordsSet(group, page) {
    const minNumOfWords = 10;
    this.wordsDB = await this.model.words.getUserWordSet();
    this.updateDB = true;
    const setOfWords = [];
    this.wordsDB.forEach((element) => {
      setOfWords.push(element.optional);
    });
    let words = Utils.prepareDataForGame(setOfWords);
    if (Object.keys(words).length < minNumOfWords) {
      words = await this.model.words.getWordsSet(group, page);
      this.updateDB = false;
    }
    return words;
  }

  async getCurrentSettings() {
    const gameSettings = await this.model.options.getGameSettings();
    const levelSettings = await this.model.options.getUserSettings();
    return { levelSettings, gameSettings };
  }
}

export default Controller;
