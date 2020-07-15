import Model from './Model';
import View from './View';

export default class SpeakitController {
    constructor(URL) {
        this.URL = URL;
        this.init();
    }

    async init() {
        debugger;
        this.model = new Model(this.URL);
        // await this.model.init()
        // .then(() => {
        //     this.view = new View(this.model)
        // });
        this.view = new View(this.model);
    }
}