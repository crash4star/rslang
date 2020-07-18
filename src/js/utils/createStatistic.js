import createProgressBar from './progressBar'
import StatisticElement from '../speakit/elements/StatisticElement';
import '../../css/miniGameStatistic.scss';


class Statistic {
  constructor(view, callback) {
    this.view = view;
    this.callback = callback;
  }

  addStatisticElement(element, parent) {
    const statElement = new StatisticElement(element, parent);
    statElement.init();
  }

  clearRoot(root) {
    root.innerHTML = '';
    root.classList.remove('root-active');
  }

  addButtonListeners() {
    const root = document.querySelector('.root');
    this.onMainPageBtn.addEventListener('click', () => {
      this.clearRoot(root);
    });
    if (this.callback) {
      this.continueBtn.addEventListener('click', () => {
        this.clearRoot(root);
        this.callback();
      });
    }
  }

  renderStat(rightAnswers, wrongAnswers) {
    const statisticWrapper = this.view.createElement({
      node: 'div',
      styleName: 'statistic-wrapper',
    })
    const statWordsContaier = this.view.createElement({
      node: 'div',
      styleName: 'statProgressBar-WordsContainer',
    });
    const statBtnsContainer = this.view.createElement({
      node: 'div',
      styleName: 'statBtnsContainer',
    });
    this.continueBtn = this.view.createElement({
      node: 'button',
      styleName: 'continueBtn',
    });
    this.continueBtn.textContent = 'Continue';

    this.onMainPageBtn = this.view.createElement({
      node: 'button',
      styleName: 'onMainPageBtn ',
    });
    this.onMainPageBtn.textContent = 'Main page';
    const statContainer = this.view.createElement({
      node: 'div',
      styleName: 'stat-container',
    });
    const rightAnswersContainer = this.view.createElement({
      node: 'div',
      styleName: 'right-answers',
    });
    const wrongAnswersContainer = this.view.createElement({
      node: 'div',
      styleName: 'wrong-answers',
    });
    const rightAnswersContainerHeading = this.view.createElement({ node: 'div', styleName: 'rigthAnswersHeading' });
    rightAnswersContainerHeading.textContent = 'Right Answers:';

    const wrongAnswersContainerHeading = this.view.createElement({ node: 'div', styleName: 'wrongAnswersHeading' });
    wrongAnswersContainerHeading.textContent = 'Wrong Answers:';

    statWordsContaier.append(rightAnswersContainer);
    statWordsContaier.append(wrongAnswersContainer);
    const containerForProgressBar = this.view.createElement({
      node: 'div',
      id: 'circle-container',
    });

    statWordsContaier.append(containerForProgressBar);

    statContainer.append(statWordsContaier);
    statContainer.append(statBtnsContainer);
    rightAnswersContainer.append(rightAnswersContainerHeading);
    wrongAnswersContainer.append(wrongAnswersContainerHeading);
    
    rightAnswers.forEach((item) => {
      let rightAnswer = item;
      rightAnswer = this.view.createElement({
        node: 'div',
        styleName: 'right-answer',
      });

      if (Array.isArray(rightAnswers)) {
        rightAnswer.textContent = item;
      } else {
          this.addStatisticElement(item, rightAnswer);
      }
      rightAnswersContainer.append(rightAnswer);
    });
    
    wrongAnswers.forEach((item) => {
      let wrongAnswer = item;
      wrongAnswer = this.view.createElement({
        node: 'div',
        styleName: 'wrong-answer',
      });
      

      if (Array.isArray(wrongAnswers)) {
        wrongAnswer.textContent = item;
      } else {
        this.addStatisticElement(item, wrongAnswer);
      }
      wrongAnswersContainer.append(wrongAnswer);
    });

    statWordsContaier.append(rightAnswersContainer);
    statWordsContaier.append(wrongAnswersContainer);
    statBtnsContainer.append(this.continueBtn);
    statBtnsContainer.append(this.onMainPageBtn);
    statisticWrapper.append(statContainer);
    this.view.getElement('.root').append(statisticWrapper)
    const right = rightAnswers.length;
    const round = rightAnswers.length + wrongAnswers.length
    createProgressBar(containerForProgressBar, right, round);

    this.addButtonListeners();
  }
}
export default Statistic