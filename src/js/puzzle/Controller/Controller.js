class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.startGameEvent(this.bindStartGame.bind(this));
    this.numberOfTurns = 9;
    this.currentTurn = 0;
  }

  async bindStartGame() {
    this.currentTurn = 0;
    this.currentSettings = await this.getCurrentSettings();
    console.log('currentLevelController: ', this.currentSettings);
    // this.view.renderGamePage(currentSettings);
    this.view.controlPanel.updateControlPanel(this.currentSettings);
    this.words = await this.getWordsSet(this.currentSettings.levelSettings.level,
      this.currentSettings.levelSettings.page);
    console.log('words: ', this.words);
    this.currentPuzzle = this.model.paintings.getPainting(this.currentSettings.levelSettings.level,
      this.currentSettings.levelSettings.page); // aaa
    // this.view.changeGameLevelEvent(this.bindStartGame.bind(this), this.bindGetLevel.bind(this));
    // this.view.changeDefaultLevel(this.bindChangeLevelData.bind(this));
    // const currentPuzzle = this.model.paintings.getPainting(currentSettings.levelSettings.level,
    //  currentSettings.levelSettings.page);
    // this.view.puzzlePanel.updatePuzzlePanel(currentPuzzle);
    // this.gameLogic(words);
    this.turn(this.words);
    this.view.gameEvents(this.checkEvent.bind(this), this.continueEvent.bind(this),
      this.getCurrentTurn.bind(this), this.dontKnowEvent.bind(this),
      this.showResultEvent.bind(this));
    this.view.controlPanelEvents(this.bindChangeSettingsEvent.bind(this));
  }

  getCurrentTurn() {
    return this.currentTurn;
  }

  showResultEvent() {
    if (this.currentTurn === this.numberOfTurns) {
      this.currentTurn += 1;
      this.view.phrasePanel.removeAllItems();
      this.view.puzzlePanel.removeAllLines();
      // this.view.puzzlePanel.setBackground(currentPuzzle);
      this.box = document.getElementById('puzzle-box');
      this.box.style.backgroundImage = `url('${this.currentPuzzle}')`;
      const currentPuzzleInfo = this.model.paintings
        .getPaintingDescription(this.currentSettings.levelSettings.level,
          this.currentSettings.levelSettings.page);
      console.log('currentPuzzleInfo: ', currentPuzzleInfo);
      this.view.phrasePanel.showPaintingInfo(currentPuzzleInfo);
    } else {
      this.view.showStatisticEvent(this.bindGetStatistic.bind(this));
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
    this.view.puzzlePanel.setElements(this.currentTurn,
      this.words[this.currentTurn].answerPhrase);
    this.model.statistic.addIncorrectValue(this.words[this.currentTurn].word);
    // this.view.phrasePanel.updatePhrasePanel(this.words[this.currentTurn].answerPhrase);
    // console.log('this.words[this.currentTurn].answerPhrase: ',
    // this.words[this.currentTurn].answerPhrase);
  }

  checkEvent() {
    console.log('checkEvent: ', this);
    const lineData = this.view.puzzlePanel.getLineData(this.currentTurn);
    const textData = this.words[this.currentTurn].textExample;
    const textDataArray = this.words[this.currentTurn].textExample.split(' ');
    const marks = [];
    lineData.forEach((element, index) => {
      marks.push(element === textDataArray[index]);
    });
    this.view.puzzlePanel.markCorrectsAndIncorrectsItems(marks, this.currentTurn);
    console.log(lineData);
    if (lineData.join(' ') === textData) {
      this.model.statistic.addCorrectValue(this.words[this.currentTurn].word);
      return true;
    }
    this.model.statistic.addIncorrectValue(this.words[this.currentTurn].word);
    return false;
  }

  turn(words) {
    console.log(this.currentTurn);
    this.view.hintsPanel.updateHintsPanel(words[this.currentTurn].textExampleTranslate,
      words[this.currentTurn].audioExample);
    this.view.phrasePanel.updatePhrasePanel(words, this.currentTurn, this.view.getWidth(), this.currentPuzzle);
    this.view.puzzlePanel.addLine(this.currentTurn);
    // this.view.setImageOnItems(this.currentPuzzle, words[this.currentTurn].textExample,
    //   this.currentTurn);
    console.log('Autolisten: ', this.currentSettings.gameSettings.autoListen);
    if (this.currentSettings.gameSettings.autoListen === true) {
      setTimeout(() => {
        this.view.hintsPanel.playSound();
      }, 100);
    }
  }

  async bindChangeSettingsEvent(optionId, value) {
    console.log('optionId: ', optionId);
    const optionsID = ['auto-wrapper', 'translation-wrapper', 'sound-wrapper', 'picture-wrapper'];
    const options = {
      0: 'autoListen',
      1: 'translation',
      2: 'listenSentence',
      3: 'puzzleImage',
    };
    this.model.options.setGameSettings(options[optionsID.indexOf(optionId)], value);
    this.currentSettings = await this.getCurrentSettings();
    console.log('this.currentSettings: ', this.currentSettings);
  }

  async bindGetLevel() {
    return this.model.options.getLevelSettings();
  }

  async getWordsSet(group, page) {
    const words = this.model.words.getWordsSet(group, page);
    console.log('words: ', words);
    return words;
  }

  async getCurrentSettings() {
    const gameSettings = await this.model.options.getGameSettings();
    const levelSettings = await this.model.options.getLevelSettings();
    return { levelSettings, gameSettings };
  }
}

export default Controller;
