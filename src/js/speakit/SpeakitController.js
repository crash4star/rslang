import Model from './Model';
import View from './View';

export default class SpeakitController {
    constructor() {
        this.init();
    }

    init() {
        debugger;
        this.model = new Model();
        this.view = new View(this.model);
    }
}