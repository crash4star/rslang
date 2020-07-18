import addElement from "../../utils/utils";
import { soundImageUrl, translateUrl, gitUrl } from "../data/data";

export default class StatisticElement {
    constructor (data, parent) {
        this.parent = parent;
        this.word = data.word;
        this.transcription = data.transcription;
        this.audioURL = data.audio;
        this.isAnswered = data.isAnswered;
        this.id = data.id;
    }

    async init() {
        this.audio = new Audio();
        const element = addElement('div', this.parent, 'minigame-statistic', this.id);
        addElement('img', element, 'minigame-statistic--card-sound', null, null, ['src', soundImageUrl]);
        addElement('div', element, 'minigame-statistic--word', null, this.word);
        addElement('div', element, 'minigame-statistic--transcription', null, this.transcription);
        const translation = await(this.getTranslation(this.word));
        addElement('div', element, 'minigame-statistic--translation', null, translation);

        const audioFile = this.audioURL;
        element.addEventListener('click', () => {
            const src = audioFile;
            this.audio.src = `${gitUrl}${src}`;
            this.audio.play();
        });
    }

    async getTranslation(word) {
        const url = `${translateUrl}&text=${word}&lang=en-ru`;
        const res = await fetch(url);
        const data = await res.json();
        return data.text.join('');
    }
}