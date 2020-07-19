import getRandomInt from '../utils/getRandomInt';
import randomInteger from './components/getRandomIntForRound';
import checkEndGame from './components/timer';
import Api from '../models/Api';
import AuthRequest from '../models/AuthRequest';
import Settings from '../models/Settings';
import UserWord from '../utils/UserWord';

class SprintControllerApp {
  constructor(model, view, viewMethods) {
    this.model = model;
    this.view = view;
    this.viewMethods = viewMethods;
    this.rightAnswers = [];
    this.wrongAnswers = [];
    this.word = {};
    this.points = 0;
    this.combo = 0;
    this.gameMode = true;
    this.page = getRandomInt(30);
    this.url = 'https://afternoon-falls-25894.herokuapp.com';
    this.api = new Api(this.url);
    this.request = new AuthRequest(this.api);
    this.difficult = new Settings(this.api, this.request);
    this.diff = 0;
    this.previousIndex = [];
    this.checkUserWordsCount();
  }

  checkUserWordsCount() {
    this.model.getUserWords().then((data) => {
      if (data.length < 40) {
        this.viewMethods.getElement(
          '.sprint-startBtnlearnedWords'
        ).onclick = () => {
          alert('Слишком мало изученных слов для данного режима');
        };
      }
    });
  }

  start() {
    this.view.renderStartPage();
    this.difficult.getUserSettings().then((data) => {
      this.diff = data.optional.settingsProfile.difficult - 1;
    });
  }

  play() {
    this.view.renderGame();
    this.getWords();
    this.view.createTimer();
    checkEndGame(this.rightAnswers, this.wrongAnswers);
    this.view.createPoints(this.points);
  }

  playLearnedWords() {
    this.view.renderGame();
    this.getWordsForlearnedWords();
    this.view.createTimer();
    checkEndGame(this.rightAnswers, this.wrongAnswers);
    this.view.createPoints(this.points);
  }

  nextRound() {
    this.view.renderGame();
    if (this.gameMode === false) {
      this.getWordsForlearnedWords();
    } else {
      this.getWords();
    }
    this.view.createPoints(this.points);
  }

  getWordsForlearnedWords() {
    this.gameMode = false;
    const wordsForRound = {};
    this.model
      .getUserWords()
      .then((data) => {
        let indexForRightTranslate = getRandomInt(data.length);
        if (this.previousIndex.includes(indexForRightTranslate)) {
          indexForRightTranslate = getRandomInt(data.length);
        }
        
        this.previousIndex.push(indexForRightTranslate);
        wordsForRound.word = data[indexForRightTranslate].optional.word;
        wordsForRound.rightTranslate =
          data[indexForRightTranslate].optional.wordTranslate;
        this.word = data[indexForRightTranslate];
      })
      .then(() => {
        this.model
          .getWords(this.diff, this.page)
          .then((data) => {
            const indexForWrongTraslate = getRandomInt(20);
            wordsForRound.wrongTranslate =
              data[indexForWrongTraslate].wordTranslate;
          })

          .then(() => {
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
      });
  }

  getWords() {
    this.model
      .getWords(this.diff, this.page)
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
        this.combo += 1;

        if (this.combo >= 4 && this.combo < 7) {
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
        if(this.gameMode === false) {
        const newWord = new UserWord(this.word, false);
        newWord.setImportant();
        this.model.upsertUserWord(newWord.id, newWord.getUserWord());
        }
        this.combo = 0;
        this.viewMethods.getElement('.sprint-container').remove();
        this.wrongAnswers.push(enWord);
        this.nextRound();
      };
    }
    if (!wordTranslate.classList.contains('rightAnswer')) {
      rightBtn.onclick = () => {
        if(this.gameMode === false) {
        const newWord = new UserWord(this.word, false);
        newWord.setImportant();
        this.model.upsertUserWord(newWord.id, newWord.getUserWord());
        }
        this.combo = 0;
        this.viewMethods.getElement('.sprint-container').remove();
        this.wrongAnswers.push(enWord);
        this.nextRound();
      };
      wrongBtn.onclick = () => {
        this.combo += 1;

        if (this.combo >= 4 && this.combo < 7) {
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
