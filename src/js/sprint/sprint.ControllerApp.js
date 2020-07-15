import Statistic from '../utils/createStatistic';
import getRandomInt from '../utils/getRandomInt';
import shuffleArr from '../utils/shuffleArr'; 
import randomInteger from './components/getRandomIntForRound'


class SprintControllerApp {
    constructor(model, view, viewMethods) {
      this.model = model;
      this.view = view;
      this.viewMethods = viewMethods;
      this.points = 0
    }

    start() {
        this.getWords()
        this.view.render()

    }

    getWords() {
        const difficult = 0;
        const page = getRandomInt(30);
        this.model
          .getWords(difficult, page)
          .then((data) => {
            const wordsForRound = {}
           const indexForRightTranslate = getRandomInt(20)
            let indexForWrongTraslate = getRandomInt(20)
            if(indexForRightTranslate === indexForWrongTraslate) {
              indexForWrongTraslate = getRandomInt(20)
            }
            wordsForRound.word = data[indexForRightTranslate].word
            wordsForRound.rightTranslate = data[indexForRightTranslate].wordTranslate;
            wordsForRound.wrongTranslate = data[indexForWrongTraslate].wordTranslate;
            return wordsForRound
          })
          .then((wordsForRound) => {
            const randomInt = randomInteger(0, 1)
            if(randomInt === 0) {
            this.view.createWords(wordsForRound.word, wordsForRound.rightTranslate, 'right')
            } else {
              this.view.createWords(wordsForRound.word, wordsForRound.wrongTranslate, 'wrong')
            }
            this.game()
          })
          
      }

      game() {
       const rightBtn = this.viewMethods.getElement('.sprint-rightBtn')
       const wrongBtn = this.viewMethods.getElement('.sprint-wrongBtn')
       const wordTranslate = this.viewMethods.getElement('.sprint-ruWord')
       rightBtn.onclick = () => {
        if(wordTranslate.classList.contains('rightAnswer')) {
        this.viewMethods.getElement('.sprint-wrapper').remove()
          this.start()
        }
       }
      }
}

export default SprintControllerApp