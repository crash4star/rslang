import Api from '../models/Api';
import Words from '../models/Words';
import AuthRequest from '../models/AuthRequest';
import Settings from '../models/Settings';
import Statistics from '../models/Statistics';

const gamesInLevel = 60;
const wordsPerRound = 10;

export default class Model {
    constructor(URL) {
        this.URL = URL;
        this.round = 0;
    }

    async getUserSettings(settings) {
        this.settings = settings;
        if (!this.settings.optional.speakit) {
            this.settings.optional.speakit = {
                round: 0
            }
            const updatedSettings = {
                optional: this.settings.optional
            }
            await this.settingsObject.updateSettings(updatedSettings);
        }

        this.round = this.settings.optional.speakit.round;
        this.difficult = Math.floor(this.round / gamesInLevel);
        this.page = Math.floor((this.round % gamesInLevel) / 2);
    }

    getWordsByLevel(data) {
        if (this.round % 2 === 0)
            this.words.wordsByLevel = data.filter((el, index) => {
                if (index < wordsPerRound) return el;
            });
        else {
            this.words.wordsByLevel = data.filter((el, index) => {
                if (index >= wordsPerRound) return el;
            }); 
        }
    }

    getWordsToStudy(data) {
        data.sort((a, b) => {
            const previousRating = a.optional.interval;
            const nextRating = b.optional.interval;
            if (previousRating < nextRating) return -1;
            if (previousRating === nextRating) return 0;
            if (previousRating > nextRating) return 1;
        });
        this.words.wordsToStudy = [];
        let counter = 0;
        let index = 0;
        while (counter < 10 && index < data.length) {
            if (data[index].optional.interval > 0) {
                this.words.wordsToStudy.push(data[index]);
                counter += 1;
            }
            index += 1;
        }
    }

    async init () {
        this.api = new Api(this.URL);
        this.authRequest = new AuthRequest(this.api);
        this.settingsObject = new Settings(this.api, this.authRequest);
        const words = new Words(this.api, this.authRequest);
        const statistics = new Statistics(this.api, this.authRequest);
        this.words = {};
        this.userSettings = {};
        await this.settingsObject.getUserSettings()
        .then(settings => {
            this.getUserSettings(settings);
        })
        .then(() => words.getUserWords())
        .then((data) => this.getWordsToStudy(data))
        .then(() => words.getWords(Number(this.difficult), this.page))
        .then(result => {
            this.getWordsByLevel(result);
        });
    }
}

export { gamesInLevel };