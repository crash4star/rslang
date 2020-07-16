import Model from './Model';
import View from './View';

export default class SpeakitController {
    constructor(URL) {
        this.URL = URL;
        this.init();
    }

    async init(isNeedToLoadStartPage = true, isLoadStudiedWords = false) {
        this.model = new Model(this.URL);
        await this.model.init()
        .then(() => {
            this.view = new View(this.model, this, isNeedToLoadStartPage, isLoadStudiedWords);
        });
    }
}