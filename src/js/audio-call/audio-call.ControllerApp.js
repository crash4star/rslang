import CreateWords from './components/createWords';
import notificationStart from './components/audio';
import Statistic from '../utils/createStatistic';
import getRandomInt from '../utils/getRandomInt'
import shuffleArr from '../utils/shuffleArr'

class AudioCallControllerApp {
  constructor(model, view, viewMethods) {
    this.model = model;
    this.view = view;
    this.viewMethods = viewMethods;
    this.wrongAnswers = [];
    this.rightAnswers = [];
    this.round = 0;
    this.difficult = 0;
    this.page = getRandomInt(30)
    this.gameMode = true;
    this.wordsForRound = {};
    this.wrongAnswersObj = {}
    this.previousIndex = [];
  }

  start() {
    this.view.render();
   this.getWordsForLearnedWords()
  }

  startLearnedWordsMode() {
    this.view.render();
    this.getWordsForLearnedWords()
  }

  getWordsForLearnedWords() {
    this.gameMode = false;
    const ruRandomWords = []
    this.model.getUserWords()
    .then((data) => {
      
     let indexForRightAns = getRandomInt(data.length)
     if(this.previousIndex.includes(indexForRightAns)) {
      indexForRightAns = getRandomInt(data.length)
     }
     this.previousIndex.push(indexForRightAns)
     this.wordsForRound.id = data[indexForRightAns].wordId
     this.wordsForRound.word = data[indexForRightAns].optional.word
     this.wordsForRound.translate = data[indexForRightAns].optional.wordTranslate
     this.wrongAnswersObj.difficulty = data[indexForRightAns].difficulty
     this.wrongAnswersObj.optional = data[indexForRightAns].optional
      ruRandomWords.push(data[indexForRightAns].optional.wordTranslate)
    })
    .then(() => {
      this.model
      .getWords(this.difficult, this.page)
      .then((data) => {
        
        data.forEach(item => {
         ruRandomWords.push(item.wordTranslate)
        })
        this.wordsForRound.randomWords = shuffleArr(ruRandomWords.splice(0, 5))
      })
      .then(() => {
        const sonar = this.viewMethods.getElement('.wave');
        if (!sonar.classList.contains('sonar-wave')) {
          sonar.classList.add('sonar-wave');
        }
        this.view.createRuWords(this.wordsForRound.randomWords, this.wordsForRound.translate)
        this.game(this.wordsForRound.word);
        notificationStart(this.wordsForRound.word);
      })
    })
  }

  getWords() {
    this.model
      .getWords(this.difficult, this.page)
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
        this.page = getRandomInt(30);
        this.round += 1;
        if (word.classList.contains('answer')) {
          this.rightAnswers.push(enWord);
          word.style.pointerEvents = 'none';
          this.correctAnswer(enWord);
        } else {
          this.wrongAnswers.push(enWord);
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
        this.wrongAnswersObj.optional.important = true;
        this.model.upsertUserWord(this.wordsForRound.id, this.wrongAnswersObj);
      }
    });

    this.view.createBtnForNextWords();
    this.nextRound();
  }

  nextRound() {
    this.viewMethods.getElement('.next-round').onclick = () => {
      this.viewMethods.getElement('.answerWord').remove();
      this.view.removeRuWordsAndBtn();
      if (this.round === 10) {
        this.endGame();
      } else {
        if(this.gameMode === false) {
          this.getWordsForLearnedWords()
        } else {
          this.getWords();
        }
        
      }
    };
  }

  endGame() {
    this.viewMethods.getElement('.root').innerHTML = '';
    new Statistic(this.viewMethods).renderStat(this.rightAnswers, this.wrongAnswers);
  }
}

export default AudioCallControllerApp;
