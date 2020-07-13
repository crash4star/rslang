import Api from '../models/Api';
import Words from '../models/Words';
import { wordsUrl } from '../speakit/data/data';
import AuthRequest from '../models/AuthRequest';
import Settings from '../models/Settings';
import Statistics from '../models/Statistics';

export default class Model {
    constructor(URL) {
        this.URL = URL;
        this.page = 0;
    }

    getUserSettings(settings) {
        this.userSettings.difficult = settings.optional.settingsProfile.difficult;
        this.userSettings.wordsPerPage = settings.wordsPerDay;
        return this.userSettings.difficult;
    }

    getWordsByLevel(data) {
        this.words.wordsByLevel = data;
    }

    async init () {
        debugger;
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
        .then(() => words.getWords(this.userSettings.difficult, this.page))
        .then(result => {
            this.getWordsByLevel(result);
        })
        .then(() => words.getUserWords())
        .then((data) => this.words.wordsToStudy = data)
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