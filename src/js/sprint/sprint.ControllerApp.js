import getRandomInt from '../utils/getRandomInt';
import randomInteger from './components/getRandomIntForRound';
import checkEndGame from './components/timer';

class SprintControllerApp {
  constructor(model, view, viewMethods) {
    this.model = model;
    this.view = view;
    this.viewMethods = viewMethods;
    this.rightAnswers = [];
    this.wrongAnswers = [];
    this.points = 0;
    this.combo = 0;
  }

  start() {
    this.view.renderStartPage();
  }

  play() {
    this.view.renderGame();
    this.getWords();
    this.view.createTimer();
    checkEndGame(this.rightAnswers, this.wrongAnswers);

    this.view.createPoints(this.points);
  }

  nextRound() {
    this.view.renderGame();
    this.getWords();
    this.view.createPoints(this.points);
  }

  getWords() {
    const difficult = 0;
    const page = getRandomInt(30);
    this.model
      .getWords(difficult, page)
      .then((data) => {
        const wordsForRound = {};
        const indexForRightTranslate = getRandomInt(20);
        let indexForWrongTraslate = getRandomInt(20);
        if (indexForRightTranslate === indexForWrongTraslate) {
          indexForWrongTraslate = getRandomInt(20);
        }
        wordsForRound.word = data[indexForRightTranslate].word;
        wordsForRound.rightTranslate =
          data[indexForRightTranslate].wordTranslate;
        wordsForRound.wrongTranslate =
          data[indexForWrongTraslate].wordTranslate;
        return wordsForRound;
      })
      .then((wordsForRound) => {
        const randomInt = randomInteger(0, 2);
        if (randomInt === 0 || randomInt === 2) {
          this.view.createWords(
            wordsForRound.word,
            wordsForRound.rightTranslate,
            'right'
          );
        } else {
          this.view.createWords(
            wordsForRound.word,
            wordsForRound.wrongTranslate,
            'wrong'
          );
        }
        this.game();
      });
  }

  game() {
    const rightBtn = this.viewMethods.getElement('.sprint-rightBtn');
    const wrongBtn = this.viewMethods.getElement('.sprint-wrongBtn');
    const wordTranslate = this.viewMethods.getElement('.sprint-ruWord');
    const enWord = this.viewMethods.getElement('.sprint-enWord').textContent;
    

    if (wordTranslate.classList.contains('rightAnswer')) {
      rightBtn.onclick = () => {
        console.log('rigth')
        this.combo += 1;
        
        console.log(this.combo)
        if (this.combo >= 4) {
          this.points += 20;
        } else if (this.combo >= 7) {
          this.points += 40;
        } else {
          this.points += 10;
        }
        this.rightAnswers.push(enWord);
        this.viewMethods.getElement('.sprint-container').remove();
        this.nextRound();
      };
      wrongBtn.onclick = () => {
        console.log('error')
        
        this.combo = 0;

        this.viewMethods.getElement('.sprint-container').remove();
        this.wrongAnswers.push(enWord);
        this.nextRound();
      };
    }
    if (!wordTranslate.classList.contains('rightAnswer')) {
      rightBtn.onclick = () => {
        console.log('error')

        this.combo = 0;
        this.viewMethods.getElement('.sprint-container').remove();
        this.wrongAnswers.push(enWord);
        this.nextRound();
      };
      wrongBtn.onclick = () => {
        console.log('rigth')
        this.combo += 1;
       
        console.log(this.combo)
        if (this.combo >= 4) {
          this.points += 20;
        } else if (this.combo >= 7) {
          this.points += 40;
        } else {
          this.points += 10;
        }
        this.rightAnswers.push(enWord);
         this.viewMethods.getElement('.sprint-container').remove();
        this.nextRound();
      };
    }
  }
}

export default SprintControllerApp;
