import getRandomInt from '../utils/getRandomInt';
import Api from '../models/Api';
import AuthRequest from '../models/AuthRequest';
import Settings from '../models/Settings';
import shuffleArr from '../utils/shuffleArr';
import Statistic from '../utils/createStatistic'
import createCallbackOwnGame from './components/createCallbackOwnGame'

class OwnGameControllerApp {
  constructor(model, view, viewMethods) {
    this.model = model;
    this.view = view;
    this.viewMethods = viewMethods;
    this.page = getRandomInt(30);
    this.url = 'https://afternoon-falls-25894.herokuapp.com';
    this.api = new Api(this.url);
    this.request = new AuthRequest(this.api);
    this.difficult = new Settings(this.api, this.request);
    this.diff = 0;
    this.text = '';
    this.round = 0;
    this.previousIndex = [];
    this.rightAnswers = [];
    this.wrongAnswers = []
    this.word = ''
  }

    renderStartPage() {
        this.view.renderStartPage()
    }  

    start() {
    this.view.renderGame();
    this.difficult.getUserSettings().then((data) => {
      this.diff = data.optional.settingsProfile.difficult - 1;
    });
    this.createWords();
  }

  createWords() {
      let randomIndex = getRandomInt(20);
    this.model.getWords(this.diff, this.page).then((data) => {
      if (this.previousIndex.includes(randomIndex)) {
        randomIndex = getRandomInt(20);
      }

      this.previousIndex.push(randomIndex);
      this.text = data[randomIndex].textExample;
      this.word = data[randomIndex].word;
      const answers = [];
      let ansWord = '';
      const textArr = this.text.split(' ');

      textArr.forEach((item, i) => {
        if (item.startsWith('<b>')) {
          ansWord = item;
          textArr.splice(i, 1, '...');
        }
      });
      this.view.createSentence(textArr.join(' '));
      data.forEach((item) => {
        if (item.word !== this.word) {
          answers.push(item.word);
        }
      });
      answers.splice(0, 15);
      answers.push(this.word);
      this.view.createBtnsAns(shuffleArr(answers), this.word);
      this.game();
    });
  }

  game() {
    const btns = this.viewMethods.getAllElements('.word-answ');
    btns.forEach((item) => {
      item.onclick = () => {
         this.answer()
        if (item.classList.contains('own-game-answer-word')) {
          this.viewMethods.getElement(
            '.sentence-container'
          ).innerHTML = this.text;
          this.viewMethods.getElement('.own-game-answer-word').style.background = 'green'
          this.rightAnswers.push(this.word)
          this.view.createBtnForNextRound();
          this.nextRound()
        } else {
            
            this.viewMethods.getElement('.own-game-answer-word').style.background = 'green'
            
            item.style.textDecoration = 'line-through';
            this.wrongAnswers.push(this.word)
            this.view.createBtnForNextRound();
            this.nextRound()
        }
      };
    });
    
  }

  answer() {
    const btns = this.viewMethods.getAllElements('.word-answ');
    btns.forEach(item => {
        item.style.pointerEvents = 'none';
    })
  }

  nextRound() {
      if(this.round === 10) {
          this.endGame()
      } else {
         this.round++
    this.viewMethods.getElement('.ownGame-nextRound-btn').onclick = () => {
        this.viewMethods.getElement('.ownGame-container').innerHTML = ''
    this.createWords();
    } 
      }
    
    
    
  }

  endGame() {
    this.viewMethods.getElement('.root').innerHTML = '';
    new Statistic(this.viewMethods, createCallbackOwnGame).renderStat(
        this.rightAnswers,
        this.wrongAnswers
      );
  }
}

export default OwnGameControllerApp;
