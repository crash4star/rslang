import Element from './main-element';

class AnswersBar extends Element {
    constructor(options, answers) {
        super(options);
        this.answers = answers;
    }

    addAnswers() {
        const wrapper = document.querySelector(`.${this.cssStyle}`);

        this.answers.forEach(item => {
            const answerBtn = new Element({node: 'button', cssStyle: 'savannah__answer-btn', id: `answer-${item}`, textContent: item});
            wrapper.append(answerBtn.create());
        });
    }
}

export default AnswersBar;