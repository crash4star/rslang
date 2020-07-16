class SprintView {
  constructor(viewMethods) {
    this.viewMethods = viewMethods;
    this.app = this.viewMethods.getElement('.root');
  }

  renderStartPage() {
    const sprintWrapper = this.viewMethods.createElement({
      node: 'div',
      styleName: 'sprint-wrapper',
    });
    const sprintContainer = this.viewMethods.createElement({
      node: 'div',
      styleName: 'sprint-container',
    });

    const nameOfTheGame = this.viewMethods.createElement({
      node: 'h1',
      styleName: 'sprint-nameOfTheGame',
    });
    nameOfTheGame.textContent = 'SPRINT';
    const description = this.viewMethods.createElement({
      node: 'div',
      styleName: 'sprint-gameDescription',
    });
    description.textContent =
      'Game: the player is given a word in English and a translation of the word, you need to specify whether this translation belongs to this word';
    const startBtn = this.viewMethods.createElement({
      node: 'button',
      styleName: 'sprint-startBtn',
    });
    const startBtnForlearnedWords = this.viewMethods.createElement({
      node: 'button',
      styleName: 'sprint-startBtnlearnedWords',
    });
    const hint = this.viewMethods.createElement({
      node: 'div',
      styleName: 'hint',
    });
    hint.textContent = 'In the second game mode, only learned words from the main game are used. If there are not enough words, they will be repeated. Have a nice game'

    const closeBtn = this.viewMethods.createElement({
      node: 'div',
      styleName: 'sprint-closeBtn',
    });
    startBtn.textContent = 'START';
    startBtnForlearnedWords.textContent = 'learned Words mode'
    sprintContainer.append(nameOfTheGame);
    sprintContainer.append(description);
    sprintContainer.append(startBtn);
    sprintContainer.append(startBtnForlearnedWords)
    sprintContainer.append(hint)
    sprintWrapper.append(closeBtn)
    sprintWrapper.append(sprintContainer);
    this.app.append(sprintWrapper);
    const root = this.viewMethods.getElement('#root');
    closeBtn.onclick = () => {
      root.removeChild(sprintWrapper);
      root.classList.remove('root-active');
    };
    hint.onclick = () => {
      hint.style.display = 'none'
    }
  }

  renderGame() {
    const sprintWrapper = this.viewMethods.getElement('.sprint-wrapper');
    const sprintContainer = this.viewMethods.createElement({
      node: 'div',
      styleName: 'sprint-container',
    });
    const sprintGameContainer = this.viewMethods.createElement({
      node: 'div',
      styleName: 'sprint-game-container',
    });
    const containerForEnWord = this.viewMethods.createElement({
      node: 'div',
      styleName: 'sprint-enWord-container',
    });
    const containerForRuWord = this.viewMethods.createElement({
      node: 'div',
      styleName: 'sprint-ruWord-container',
    });
    const wordsContainer = this.viewMethods.createElement({
      node: 'div',
      styleName: 'sprint-words-container',
    });

    const btnsContainer = this.viewMethods.createElement({
      node: 'div',
      styleName: 'sprint-btns-container',
    });
    const rightAnswerBtn = this.viewMethods.createElement({
      node: 'button',
      styleName: 'sprint-rightBtn',
    });
    rightAnswerBtn.textContent = 'Right';

    const wrongAnswerBtn = this.viewMethods.createElement({
      node: 'button',
      styleName: 'sprint-wrongBtn',
    });


    wrongAnswerBtn.textContent = 'Wrong';
    btnsContainer.append(wrongAnswerBtn);
    btnsContainer.append(rightAnswerBtn);
    wordsContainer.append(containerForEnWord);
    wordsContainer.append(containerForRuWord);

    sprintGameContainer.append(wordsContainer);
    sprintGameContainer.append(btnsContainer);
    sprintContainer.append(sprintGameContainer);
    sprintWrapper.append(sprintContainer);
    // this.app.append(sprintWrapper);
  }

  createWords(word, translate, answer) {
    const enWord = this.viewMethods.createElement({
      node: 'div',
      styleName: 'sprint-enWord',
    });
    const ruWord = this.viewMethods.createElement({
      node: 'div',
      styleName: 'sprint-ruWord',
    });
    if (answer === 'right') {
      ruWord.classList.add('rightAnswer');
    }
    enWord.textContent = word;
    ruWord.textContent = translate;
    this.viewMethods.getElement('.sprint-enWord-container').append(enWord);
    this.viewMethods.getElement('.sprint-ruWord-container').append(ruWord);
  }

  createPoints(points) {
    const pointsContainer = this.viewMethods.createElement({
      node: 'div',
      styleName: 'points',
    });
    pointsContainer.textContent = points;
    this.viewMethods.getElement('.sprint-container').append(pointsContainer);
  }

  createTimer() {
    const timer = this.viewMethods.createElement({
      node: 'div',
      styleName: 'timer',
    });
    this.viewMethods.getElement('.sprint-wrapper').append(timer);
  }
}

export default SprintView;
