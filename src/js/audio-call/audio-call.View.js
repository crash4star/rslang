class AudioCallView {
  constructor(viewMethods) {
    this.viewMethods = viewMethods;
    this.app = this.viewMethods.getElement('.root');
  }

  createStartPage() {
    const closeBtn = this.viewMethods.createElement({
      node: 'div',
      styleName: 'closeBtn',
    });
    const wrapper = this.viewMethods.createElement({
      node: 'div',
      styleName: 'audio-call-wrapper',
    });
    const wrapperForStartPage = this.viewMethods.createElement({
      node: 'div',
      styleName: 'wrapperForStartPage',
    });
    const nameOfGame = this.viewMethods.createElement({
      node: 'h1',
      styleName: 'nameOfGame',
    });
    nameOfGame.textContent = 'AUDIO-CALL';

    const startBtn = this.viewMethods.createElement({
      node: 'button',
      styleName: 'startBtn',
    });
    const startBtnForlearnedWords = this.viewMethods.createElement({
      node: 'button',
      styleName: 'startBtnlearnedWords',
    });
    startBtnForlearnedWords.textContent = 'learned Words mode'
    startBtn.textContent = 'START';
    const description = this.viewMethods.createElement({
      node: 'div',
      styleName: 'description',
    });
    description.textContent =
      'Game: the word is pronounced and you have to choose the correct translation from 5 suggested words';
    wrapperForStartPage.append(closeBtn);
    wrapperForStartPage.append(nameOfGame);
    wrapperForStartPage.append(description);
    wrapperForStartPage.append(startBtn);
    wrapperForStartPage.append(startBtnForlearnedWords)
    wrapper.append(wrapperForStartPage);
    this.app.append(wrapper);
    const root = this.viewMethods.getElement('#root');
    closeBtn.onclick = () => {
      root.removeChild(wrapper);
      root.classList.remove('root-active');
    };
  }

  render() {
    const closeBtn = this.viewMethods.createElement({
      node: 'div',
      styleName: 'closeBtn',
    });
    const wrapper = this.viewMethods.getElement('.audio-call-wrapper');
    const audioCallContainer = this.viewMethods.createElement({
      node: 'div',
      styleName: 'audio-call-container',
    });
    wrapper.append(audioCallContainer);
    const wrapperWordsContainer = this.viewMethods.createElement({
      node: 'div',
      styleName: 'words-container',
    });
    const wrapperRuwords = this.viewMethods.createElement({
      node: 'div',
      styleName: 'ruContainer',
    });
    const sonarWrapper = this.viewMethods.createElement({
      node: 'div',
      styleName: 'sonar-wrapper',
    });
    const sonarEmitter = this.viewMethods.createElement({
      node: 'div',
      styleName: 'sonar-emitter',
    });
    const sonarWave = this.viewMethods.createElement({
      node: 'div',
      styleName: 'sonar-wave wave',
    });
    audioCallContainer.append(closeBtn);
    audioCallContainer.append(sonarWrapper);
    sonarWrapper.append(sonarEmitter);
    sonarEmitter.append(sonarWave);
    audioCallContainer.append(wrapperWordsContainer);
    wrapperWordsContainer.append(wrapperRuwords);
    const root = this.viewMethods.getElement('#root');
    closeBtn.onclick = () => {
      root.removeChild(wrapper);
      root.classList.remove('root-active');
    };
  }

  createRuWords(ruWords, answerWord) {
    ruWords.forEach((item) => {
      let ruWord = item;
      ruWord = this.viewMethods.createElement({
        node: 'div',
        styleName: 'ruWord',
      });
      ruWord.textContent = item;
      if (ruWord.textContent === answerWord) {
        ruWord.classList.add('answer');
      }
      this.viewMethods.getElement('.ruContainer').append(ruWord);
    });
  }

  removeRuWordsAndBtn() {
    this.viewMethods.getElement('.ruContainer').innerHTML = '';
    this.viewMethods.getElement('.next-round').remove();
  }

  createBtnForNextWords() {
    const btnForNextWords = this.viewMethods.createElement({
      node: 'button',
      styleName: 'next-round',
    });
    this.viewMethods
      .getElement('.audio-call-container')
      .append(btnForNextWords);
  }
}

export default AudioCallView;
