import Api from '../models/Api';
import Words from '../models/Words';
import AuthRequest from '../models/AuthRequest';
import Settings from '../models/Settings';
import Statistics from '../models/Statistics';

const gamesInLevel = 60;
const wordsPerRound = 10;

export default class Model {
    constructor(URL) {
        debugger;
        this.URL = URL;
        this.round = 0;
    }

    async getUserSettings(settings) {
        //this.userSettings.difficult = settings.optional.settingsProfile.difficult;
        this.settings = settings;
        debugger;
        if (!this.settings.optional.speakit) {
            this.settings.optional.speakit = {
                round: 0
            }
            await this.settingsObject.updateSettings(this.settings);
        }

        this.round = this.settings.optional.speakit.round;
        debugger;
        
        for (let i = 0; i < 360; i += 1) {
            this.round = i;
            this.difficult = Math.floor(this.round / gamesInLevel);
            this.page = Math.floor((this.round % gamesInLevel) / 2);
            console.log(`round ${i}, difficult ${this.difficult}, page ${this.page}`);
        }

        return this.userSettings.difficult;
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
            const previousRating = a.optional.rating;
            const nextRating = b.optional.rating;
            if (previousRating > nextRating) return -1;
            if (previousRating === nextRating) return 0;
            if (previousRating < nextRating) return 1;
        });
        this.words.wordsToStudy = [];
        let counter = 0;
        let index = 0;
        while (counter < 10 && index < data.length) {
            if (data[index].optional.rating > 0) {
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
        this.statistics = {};
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