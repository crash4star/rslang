class Statistic {
  constructor() {
    this.correct = [];
    this.incorrect = [];
  }

  addCorrectValue(value) {
    if (!this.correct.includes(value) && !this.incorrect.includes(value)) {
      this.correct.push(value);
    }
  }

  addIncorrectValue(value) {
    if (!this.incorrect.includes(value) && !this.correct.includes(value)) {
      this.incorrect.push(value);
    }
  }

  getStatistic() {
    return { correct: this.correct, incorrect: this.incorrect };
  }
}

export default Statistic;
