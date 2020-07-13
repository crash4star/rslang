import "@babel/polyfill";
import '../../css/speakit/speakit.scss';
import View from './tools/View';

export default class SpeakIt {
    constructor () {
        this.init();
    }

    init () {
        this.view = new View();
    }
}