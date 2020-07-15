import { showErrorMessage } from '../utils/message';

class LearningModel {
    constructor(api, request) {
        this.api = api;
        this.request = request;
    }

    get optionsData() {
        return {
            url: this.api.url,
            token: localStorage.getItem('token'),
            userId: localStorage.getItem('userId')
        }
    }

    async setUserStatistics(stat) {
        const URL = `/users/${this.optionsData.userId}/statistics`;
        try {
            const statistics = await this.request.put(URL, stat);
            return statistics.info;
        } catch (e) {
            showErrorMessage(e);
        }

        return showErrorMessage('connection problem');
    }

    async setUserSettings(set) { 
        const URL = `/users/${this.optionsData.userId}/settings`;
        try {
            const settings = await this.request.put(URL, set);
            return settings.info;
        } catch (e) {
            showErrorMessage(e);
        }
        return showErrorMessage('connection problem');
    }

    async upsertLinguistObjStatistics(stat) { 
        const URL = `/users/${this.optionsData.userId}/statistics`;
        const currentStatistics = await this.request.get(URL); 
        currentStatistics.optional.linguist = stat;
        delete currentStatistics.id;
        const update = await this.request.put(URL, currentStatistics);
        return update.info;   
    }

    async upsertLinguistPropsStatistics(value, key) { 
        const URL = `/users/${this.optionsData.userId}/statistics`;
        const currentStatistics = await this.request.get(URL); 
        currentStatistics.optional.linguist[key] = value;
        delete currentStatistics.id;
        const update = await this.request.put(URL, currentStatistics);
        return update.info;
    }

    async increaseLearnedWords() { 
        const URL = `/users/${this.optionsData.userId}/statistics`;
        const currentStatistics = await this.request.get(URL); 
        const key = this.getShortStringDate(+currentStatistics.optional.linguist.date);
        const newNumber = currentStatistics.optional.linguist.learnedWordsDate[key] + 1;
        const newNumberFull = currentStatistics.learnedWords + 1;
        currentStatistics.optional.linguist.learnedWordsDate[key] = newNumber;
        currentStatistics.learnedWords = newNumberFull;
        delete currentStatistics.id;
        const update = await this.request.put(URL, currentStatistics);
        return update.info;
    }

    setUserLearnedWords(numberLearnedWords) {
        const URL = `/users/${this.optionsData.userId}/statistics`;
        this.request.get(URL).then(data => {
            const currentStatistics = data;
            currentStatistics.learnedWords = numberLearnedWords;
            delete currentStatistics.id;
            return currentStatistics;
        }).then(update => {
            this.request.put(URL, update);
        });   
    }


    async upsertLinguistObjSettings(object, key) { 
        const URL = `/users/${this.optionsData.userId}/settings`;
        const currentSettings= await this.request.get(URL); 
        if (key) {
            currentSettings.optional.linguist[key] = object;
        } else {
            currentSettings.optional.linguist = object;
        } 
        delete currentSettings.id;
        const update = await this.request.put(URL, currentSettings);
        return update.info;   
    }

    async upsertLearnPropsSettings(object, key) {
        const URL = `/users/${this.optionsData.userId}/settings`;
        const currentSettings = await this.request.get(URL); 
        currentSettings.optional.linguist.learn[key] = object;
        delete currentSettings.id;
        const update = await this.request.put(URL, currentSettings);
        return update.info;
    }

    async setUserNewWords(numberOfWords) {
        const URL = `/users/${this.optionsData.userId}/settings`;
        const currentSettings = await this.request.get(URL);
        currentSettings.wordsPerDay = numberOfWords;
        delete currentSettings.id;
        const update = await this.request.put(URL, currentSettings);
        return update.info;
    }

    async startLearningStatistics(defaultStatistics) {
        const URL = `/users/${this.optionsData.userId}/statistics`;
        const res = await this.request.getRawResponse(URL); 
        let statistics;
        let lastDate;
        const learnDate = `${this.getShortStringDate(Date.now())}`;
        if (res.ok) {
            statistics = await res.json(); 
            if (Object.prototype.hasOwnProperty.call(statistics.optional, 'linguist')) {   
                lastDate = statistics.optional.linguist.date;
                if (this.isNewDate(lastDate)) {
                    statistics.optional.linguist.newWordsToday = 0;
                    statistics.optional.linguist.cardToday = 0;
                    statistics.optional.linguist.rightsToday = 0;
                    statistics.optional.linguist.longSetToday = 0;
                    statistics.optional.linguist.rightsSetToday = 0;
                    statistics.optional.linguist.repeatToday = 0;
                    statistics.optional.linguist.learnedWordsDate[learnDate] = 0;
                    delete statistics.id;
                    await this.upsertLinguistObjStatistics(statistics.optional.linguist); 
                }
            }  else {
                statistics = defaultStatistics;
                statistics.optional.linguist.learnedWordsDate = {};
                statistics.optional.linguist.learnedWordsDate[learnDate] = 0;
                await this.upsertLinguistObjStatistics(statistics.optional.linguist);
                await this.setUserLearnedWords(0);
            }
        } else {
            statistics = defaultStatistics;
            statistics.optional.linguist.learnedWordsDate = {};
            statistics.optional.linguist.learnedWordsDate[learnDate] = 0;
            await this.setUserStatistics(statistics);
        } 
        localStorage.setItem('lastDate', statistics.optional.linguist.date);
        this.saveStatisticsToLocal(statistics);
        await this.setLearningDate(); 
        return statistics.optional.linguist.date;
    }

    setLearningDate() {
        const date = Date.now();
        this.upsertLinguistPropsStatistics(date, 'date');
    }

    getStringDate(date) {
        const options = {
            year: 'numeric',
            month: 'long', 
            day: 'numeric',
        };
        return new Date(date).toLocaleString('en-US', options);
    }

    getShortStringDate(date) {
        const options = {
            year: 'numeric',
            month: 'numeric', 
            day: 'numeric',
        };
        return new Date(date).toLocaleString('en-US', options);
    }

    async startLearningSettings(defaultSettings) {  
        const URL = `/users/${this.optionsData.userId}/settings`;
        const res = await this.request.getRawResponse(URL); 
        let settings;
        if (res.ok) {
            const data = await res.json(); 
            if (Object.prototype.hasOwnProperty.call(data.optional, 'linguist')) { 
                settings = data;
            }  else {
                settings = defaultSettings;
                this.upsertLinguistObjSettings(settings.optional.linguist);
                this.setUserNewWords(20);
            }
        } else {
            settings = defaultSettings;
            this.setUserSettings(settings);
        }  
        this.saveSettingsToLocal(settings);
    }

    async saveLearnSettings(words, options) {  
        await this.upsertLinguistObjSettings(options, 'learn');
        const settings = await this.setUserNewWords(words);
        this.saveSettingsToLocal(settings);
        return settings; 
    }

    async saveCardSettings(options) {  
        const settings = await this.upsertLinguistObjSettings(options, 'cards');
        this.saveSettingsToLocal(settings);
        return settings; 
    }
    
    saveToLocal(obj, key) {
        return localStorage.setItem(key, obj);
    }
    
    getFromLocal(key) {
        return localStorage.getItem(key);
    }

    getSettingsFromLocal() {
        const object = localStorage.getItem('learningSettings');
        return JSON.parse(object);  
    }

    getStatisticsFromLocal() {
        const object = localStorage.getItem('learningStatistics');
        return JSON.parse(object);  
    }

    saveStatisticsToLocal(statObj) { 
        const object = JSON.stringify(statObj);
        localStorage.setItem('learningStatistics', object); 
    }

    saveSettingsToLocal(setObj) {
        const object = JSON.stringify(setObj);
        localStorage.setItem('learningSettings', object);  
    }

    getNewWordsFromLocal() {
        const settings = this.getSettingsFromLocal();
        return settings.wordsPerDay;
    }

    getStatisticsObjectFromLocal(key) {
        const statistics = this.getStatisticsFromLocal();
        return statistics.optional.linguist[key];
    }

    getLearnSettingsFromLocal(key) {
        const settings = this.getSettingsFromLocal();
        return settings.optional.linguist.learn[key];
    }

    getCardsSettingsFromLocal(key) {
        const settings = this.getSettingsFromLocal();
        return settings.optional.linguist.cards[key];
    }

    getLinguistSettingsFromLocal(key) {
        const settings = this.getSettingsFromLocal();
        return settings.optional.linguist[key];
    }

    async saveRightSet(isRight) {
        const URL = `/users/${this.optionsData.userId}/statistics`;
        const currentStatistics = await this.request.get(URL); 
        let rights = currentStatistics.optional.linguist.rightsToday;
        let rightsSet = currentStatistics.optional.linguist.rightsSetToday;
        let longSet = currentStatistics.optional.linguist.longSetToday;  
        
        if (!isRight) {
            rightsSet = 0;
        } else {
            rightsSet += 1;
            rights += 1;
            if (rightsSet > longSet) {
                longSet = rightsSet;
            }
        }

        delete currentStatistics.id;
        currentStatistics.optional.linguist.rightsToday = rights;
        currentStatistics.optional.linguist.longSetToday = longSet;
        currentStatistics.optional.linguist.rightsSetToday = rightsSet;
        const update = await this.request.put(URL, currentStatistics);
        return update.info;  
    }

    isNewDate(date) {
        const todayDate = new Date(Date.now());
        const prevDate = new Date(date);
        if (todayDate.getFullYear() > prevDate.getFullYear()) { 
            return true;
        }
        if (todayDate.getMonth() > prevDate.getMonth()) {
            return true;
        }
        if (todayDate.getDate() > prevDate.getDate()) {
            return true;
        }
        return false;
    }
}

export default LearningModel;