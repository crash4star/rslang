class OwnGameView {
  constructor(viewMethods) {
    this.viewMethods = viewMethods;
    this.app = this.viewMethods.getElement('.root');
  }

  renderStartPage() {
    const ownGameWrapper = this.viewMethods.createElement({
        node: 'div',
        styleName: 'ownGame-wrapper',
      });
    const startPageContainer = this.viewMethods.createElement({
        node: 'div',
        styleName: 'ownGame-startPage-container',
    })
    const startBtn = this.viewMethods.createElement({
        node: 'button',
        styleName: 'ownGame-startBtn',
      })
      const description = this.viewMethods.createElement({
        node: 'div',
        styleName: 'ownGame-gameDescription',
      });
      description.textContent =
        'Game: the player is given a word in English and a translation of the word, you need to specify whether this translation belongs to this word';
        const nameOfTheGame = this.viewMethods.createElement({
            node: 'h1',
            styleName: 'ownGame-nameOfTheGame',
          });
          nameOfTheGame.textContent = 'INSERT THE MISSING WORD'
          startPageContainer.append(nameOfTheGame)
        startPageContainer.append(description)
      startPageContainer.append(startBtn)
    ownGameWrapper.append(startPageContainer)
    this.app.append(ownGameWrapper)
  }

  renderGame() {
    const ownGameWrapper = this.viewMethods.getElement('.ownGame-wrapper')
    const ownGameContainer = this.viewMethods.createElement({
      node: 'div',
      styleName: 'ownGame-container',
    });
    ownGameWrapper.append(ownGameContainer)

  }

  createSentence(sentence) {
    const sentenceContainer = this.viewMethods.createElement({
        node: 'div',
        styleName: 'sentence-container',
      });
      sentenceContainer.textContent = sentence
      this.viewMethods.getElement('.ownGame-container').append(sentenceContainer)
  }

  createBtnsAns(words, wordAns) {
    const wordsContainer = this.viewMethods.createElement({
        node: 'div',
        styleName: 'own-game-words-container',
      })
    words.forEach(item => {
       const word = this.viewMethods.createElement({
            node: 'div',
            styleName: 'word-answ',
          })
        word.textContent = item
        if(item === wordAns) {
            word.classList.add('own-game-answer-word')
        }
        wordsContainer.append(word)
    })
    this.viewMethods.getElement('.ownGame-container').append(wordsContainer)
  }

  createBtnForNextRound() {
    const btn = this.viewMethods.createElement({
        node: 'button',
        styleName: 'ownGame-nextRound-btn',
      })
      this.viewMethods.getElement('.ownGame-container').append(btn)
  }
}

export default OwnGameView;
