import Api from '../models/Api';
import Words from '../models/Words';
import wordsUrl from '../speakit/data/data';

export default class Model {
    constructor() {
        this.init();
    }

    init () {
        this.words = new Words(new Api(wordsUrl));
        this.words.getWords();
        debugger;
        console.log(this.words);
    }
}