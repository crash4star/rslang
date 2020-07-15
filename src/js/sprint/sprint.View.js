class SprintView {
    constructor(viewMethods) {
      this.viewMethods = viewMethods;
      this.app = this.viewMethods.getElement('.root');
    }

    render() {
        const sprintWrapper = this.viewMethods.createElement({
            node: 'div',
            styleName: 'sprint-wrapper',
          });
          const sprintContainer = this.viewMethods.createElement({
            node: 'div',
            styleName: 'sprint-container',
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
          })
          const rightAnswerBtn =  this.viewMethods.createElement({
            node: 'button',
            styleName: 'sprint-rightBtn',
          })
          rightAnswerBtn.textContent = 'Right';
          
          const wrongAnswerBtn =  this.viewMethods.createElement({
            node: 'button',
            styleName: 'sprint-wrongBtn',
          })
          wrongAnswerBtn.textContent = 'Wrong'
          btnsContainer.append(wrongAnswerBtn)
          btnsContainer.append(rightAnswerBtn)
          wordsContainer.append(containerForEnWord)
          wordsContainer.append(containerForRuWord)
          sprintContainer.append(wordsContainer)
          sprintContainer.append(btnsContainer)
          sprintWrapper.append(sprintContainer)
          this.app.append(sprintWrapper);
    }

    createWords(word, translate, answer) {
      const enWord = this.viewMethods.createElement({
        node: 'div',
        styleName: 'sprint-enWord',
      })
      const ruWord = this.viewMethods.createElement({
        node: 'div',
        styleName: 'sprint-ruWord',
      })
      if(answer === 'right') {
        ruWord.classList.add('rightAnswer')
      }
      enWord.textContent = word;
      ruWord.textContent = translate;
      this.viewMethods.getElement('.sprint-enWord-container').append(enWord)
      this.viewMethods.getElement('.sprint-ruWord-container').append(ruWord)
    }
}

export default SprintView