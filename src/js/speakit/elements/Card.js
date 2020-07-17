import addElement from "../../utils/utils";
import { soundImageUrl } from '../data/data';

export default class Card {
    constructor (data, index) {
        this.node = document.querySelector('.cards');
        this.data = data;
        this.index = index;
    }

    createCard() {
        const card = addElement ('div', this.node, 'cards-card col-xl-2 col-md-3 col-4', this.index);
        addElement('img', card, 'card-sound', null, null, ['src', soundImageUrl]);
        const text = addElement('div', card, 'card-text');
        addElement('div', text, 'card-text--word', null, this.data.word);
        addElement('div', text, 'card-text--transcription', null, this.data.transcription);
    }
}