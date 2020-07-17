import addElement from '../../utils/utils';
import StatisticElement from './StatisticElement';

export default class StatisicPage {
    constructor(data, statPage) {
        this.statPage = statPage;
        this.data = data;
        this.showStat();
    }

    showStat() {
        // this.content = document.getElementById('statPage');
        this.statPage.innerHTML = '';
        const uncorrect = addElement('div', this.statPage, 'chapter');
        addElement('div', uncorrect, 'chapter-header uncorrect', null, 'Mistakes');
        const correct = addElement('div', this.statPage, 'chapter', null, null);
        addElement('div', correct, 'chapter-header correct', null, 'Right');

        this.data.forEach((element, index) => {
            const parent = element.isAnswered ? correct : uncorrect;
            const statElement = new StatisticElement(element, parent, index);
            statElement.init();
        });
    }
}