import Model from './Model';
import View from './View';

export default class SpeakitController {
    constructor(URL, isNeedToLoadStartPage = true) {
        this.URL = URL;
        this.isNeedToLoadStartPage = isNeedToLoadStartPage;
        this.init();
    }

    async init() {
        this.model = new Model(this.URL);
        await this.model.init()
        .then(() => {
            this.view = new View(this.model, this.isNeedToLoadStartPage);
        });
    }
}