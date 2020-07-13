import addElement from "../../utils/utils";
import { soundImageUrl, translateUrl, gitUrl } from './../data/data';

export default class StatisticElement {
    constructor (data, parent, index) {
        this.parent = parent;
        this.word = data.word;
        this.transcription = data.transcription;
        this.audio = data.audio;
        this.isAnswered = data.isAnswered;
        this.id = index;
        this.init();
    }

    async init() {
        const element = addElement('div', this.parent, 'speakit-statistic', this.id);
        addElement('img', element, 'card-sound', null, null, ['src', soundImageUrl]);
        addElement('div', element, 'word', null, this.word);
        addElement('div', element, 'transcription', null, this.transcription);
        const translation = await(this.getTranslation(this.word));
        addElement('div', element, 'translation', null, translation);
        // element.addEventListener('click', this.sound);
    }

    async getTranslation(word) {
        const url = `${translateUrl}&text=${word}&lang=en-ru`;
        const res = await fetch(url);
        const data = await res.json();
        return data.text.join('');
    }
}