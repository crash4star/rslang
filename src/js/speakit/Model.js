import Api from '../models/Api';
import Words from '../models/Words';
import AuthRequest from '../models/AuthRequest';
import Settings from '../models/Settings';
import Statistics from '../models/Statistics';

export default class Model {
    constructor(URL) {
        debugger;
        this.URL = URL;
        this.round = 0;
    }

    getUserSettings(settings) {
        debugger;
        this.userSettings.difficult = settings.optional.settingsProfile.difficult;
        return this.userSettings.difficult;
    }

    getWordsByLevel(data) {
        if (this.round % 2 === 0)
            this.words.wordsByLevel = data.filter((el, index) => {
                if (index < 10) return el;
            });
        else {
            this.words.wordsByLevel = data.filter((el, index) => {
                if (index >= 10) return el;
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
        const settings = new Settings(this.api, this.authRequest);
        const words = new Words(this.api, this.authRequest);
        const statistics = new Statistics(this.api, this.authRequest);
        this.words = {};
        this.userSettings = {};
        this.statistics = {};
        await settings.getUserSettings()
        .then(settings => {
            this.getUserSettings(settings);
        })
        .then(() => words.getWords(Number(this.userSettings.difficult), Math.floor(this.round % 2)))
        .then(result => {
            this.getWordsByLevel(result);
        })
        .then(() => words.getUserWords())
        .then((data) => this.getWordsToStudy(data))
        .then(() => statistics.getUserStatistics())
        .then(data => {
            if (data.optional.speakit) {
                this.statistics = data;
            } else {
                this.statistics = {
                    settings: [],
                    logs: []
                }
            }
        });
    }
}