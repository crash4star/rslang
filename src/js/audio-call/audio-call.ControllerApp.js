import CreateWords from './components/createWords';
import notificationStart from './components/audio';
import Statistic from '../utils/createStatistic';

const wrongAnswers = [];
const rightAnswers = [];
let round = 0;
let page = 0;
class AudioCallControllerApp {
  constructor(model, view, viewMethods) {
    this.model = model;
    this.view = view;
    this.viewMethods = viewMethods;
  }

  start() {
    this.view.render();
    this.getWords();
  }

  getWords() {
    const difficult = 0;

    this.model
      .getWords(difficult, page)
      .then((data) => {
        const words = [];
        data.forEach((item) => {
          const mainObj = {};
          mainObj.word = item.word;
          mainObj.translate = item.wordTranslate;
          words.push(mainObj);
        });

        return words;
      })
      .then((words) => {
        const sonar = this.viewMethods.getElement('.wave');
        if (!sonar.classList.contains('sonar-wave')) {
          sonar.classList.add('sonar-wave');
        }
        const getWordsForView = new CreateWords(words.splice(0, 5));
        const enWord = getWordsForView.getEnWord();
        const ruWords = getWordsForView.getRuWords();
        const answer = getWordsForView.getAnswer();
        this.view.createRuWords(ruWords, answer);
        this.game(enWord);
        notificationStart(enWord);
      });
  }

  game(enWord) {
    const words = this.viewMethods.getAllElements('.ruWord');

    words.forEach((item) => {
      const word = item;

      word.onclick = () => {
        document.querySelector('.wave').classList.remove('sonar-wave');
        page += 1;
        round += 1;
        if (word.classList.contains('answer')) {
          rightAnswers.push(enWord);
          word.style.pointerEvents = 'none';
          this.correctAnswer(enWord);
        } else {
          wrongAnswers.push(enWord);
          word.style.pointerEvents = 'none';
          word.style.textDecoration = 'line-through';
          this.incorrectAnswer(enWord);
        }
      };
    });
  }

  correctAnswer(enWord) {
    const answerWord = this.viewMethods.createElement({
      node: 'div',
      styleName: 'answerWord',
    });
    answerWord.textContent = enWord;
    this.viewMethods.getElement('.sonar-wrapper').append(answerWord);
    this.viewMethods.getElement('.answer').style.color = 'Violet';
    this.viewMethods.getAllElements('.ruWord').forEach((item) => {
      item.style.pointerEvents = 'none';
      if (!item.classList.contains('answer')) {
        item.style.opacity = '0.5';
      }
    });
    this.view.createBtnForNextWords();
    this.nextRound();
  }

  incorrectAnswer(enWord) {
    const answerWord = this.viewMethods.createElement({
      node: 'div',
      styleName: 'answerWord',
    });
    answerWord.textContent = enWord;
    this.viewMethods.getElement('.sonar-wrapper').append(answerWord);
    this.viewMethods.getElement('.answer').style.color = 'Violet';
    this.viewMethods.getAllElements('.ruWord').forEach((item) => {
      item.style.pointerEvents = 'none';
      if (!item.classList.contains('answer')) {
        item.style.opacity = '0.5';
      }
    });

    this.view.createBtnForNextWords();
    this.nextRound();
  }

  nextRound() {
    this.viewMethods.getElement('.next-round').onclick = () => {
      this.viewMethods.getElement('.answerWord').remove();
      this.view.removeRuWordsAndBtn();
      if (round === 10) {
        this.endGame();
      } else {
        this.getWords();
      }
    };
  }

  endGame() {
    this.viewMethods.getElement('.root').innerHTML = '';
    new Statistic(this.viewMethods).renderStat(rightAnswers, wrongAnswers);
  }
}

export default AudioCallControllerApp;
