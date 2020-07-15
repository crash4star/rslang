import createProgressBar from './progressBar'

class Statistic {
  constructor(view) {
    this.view = view;
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
    const continueBtn = this.view.createElement({
      node: 'button',
      styleName: 'continueBtn',
    });
    continueBtn.textContent = 'Continue';

    const onMainPageBtn = this.view.createElement({
      node: 'button',
      styleName: 'onMainPageBtn ',
    });
    onMainPageBtn.textContent = 'Main page';
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
      rightAnswer.textContent = item;
      rightAnswersContainer.append(rightAnswer);
    });
    wrongAnswers.forEach((item) => {
      let wrongAnswer = item;
      wrongAnswer = this.view.createElement({
        node: 'div',
        styleName: 'wrong-answer',
      });
      wrongAnswer.textContent = item;
      wrongAnswersContainer.append(wrongAnswer);
    });

    statWordsContaier.append(rightAnswersContainer);
    statWordsContaier.append(wrongAnswersContainer);
    statBtnsContainer.append(continueBtn);
    statBtnsContainer.append(onMainPageBtn);
    statisticWrapper.append(statContainer);
    this.view.getElement('.root').append(statisticWrapper)
    const right = rightAnswers.length;
    const round = rightAnswers.length + wrongAnswers.length
    createProgressBar(containerForProgressBar, right, round);
  }
}
export default Statistic