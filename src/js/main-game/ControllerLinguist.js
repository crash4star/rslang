import UserWord from '../utils/UserWord';
import defaultLearningSettings from './assets/defaultLearningSettings';
import defaultLearningStatistics from './assets/defaultLearningStatistics';
import mainGame from './startLinguist';
import {
    MINUTES_INTERVAL,
    HOURS_INTERVAL,
    DAYS_INTERVAL
} from './assets/CONST';

class ControllerLinguist {
    constructor(view, model, groupForTrain, handler) {
        this.view = view;
        this.model = model;
        this.groupForTrain = groupForTrain;
        this.shuffle = handler;
        this.start();
    }

    async start() { 
        await this.model.learning.startLearningStatistics(defaultLearningStatistics);
        await this.model.learning.startLearningSettings(defaultLearningSettings);
        this.view.start();
        this.view.bindWindow(this.countWords(), this.countCards(), this.getLastDate());

        this.view.bindRenderMainOpt(this.model.learning.getStatisticsObjectFromLocal.bind(this.model.learning), this.model.learning.getNewWordsFromLocal.bind(this.model.learning), this.model.learning.getLinguistSettingsFromLocal.bind(this.model.learning));
        
        this.view.bindSaveMainOpt(ControllerLinguist.checkMainOptionsForm, this.analyzeMainOptionsForm.bind(this));

        this.view.bindStudyNow(() => { return this.getWordArray(this.countWords(), this.countCards(), this.getMode())}, this.model.learning.getSettingsFromLocal, this.getNextWordFromLocal.bind(this), this.renderProgressCallback.bind(this));

        this.view.bindRenderCardOpt(this.model.learning.getLinguistSettingsFromLocal.bind(this.model.learning));

        this.view.bindSaveCardOpt(ControllerLinguist.checkCardOptionsForm, this.analyzeCardOptionsForm.bind(this));

        this.view.bindNextSlide(this.model.learning.getSettingsFromLocal, this.getNextWordFromLocal.bind(this), this.countSaveStudyResult.bind(this), this.model.words.upsertUserWord.bind(this.model.words), this.renderFinishCallback.bind(this), this.renderProgressCallback.bind(this), this.addWords.bind(this));

        this.view.bindRestart(mainGame);
    }

    addWords() {
        if(this.model.repeatWords.length > 0) {
            const word = this.model.repeatWords.shift();
            this.model.shuffleArray.unshift(new UserWord(word, true));
        }
    }

    renderFinishCallback() {
        const cards = this.model.learning.getStatisticsObjectFromLocal('cardToday');
        const newWords = this.model.learning.getStatisticsObjectFromLocal('newWordsToday');
        const correctAnswers = this.model.learning.getStatisticsObjectFromLocal('rightsToday');
        const longSetToday = this.model.learning.getStatisticsObjectFromLocal('longSetToday');
        const maxCards = this.model.learning.getLearnSettingsFromLocal('maxCardsPerDay');
        const maxWords = this.model.learning.getNewWordsFromLocal();
        const repeats = this.model.learning.getStatisticsObjectFromLocal('repeatToday');
        const allAnswers = repeats + cards;
        const percentage = Math.round((correctAnswers / allAnswers) * 100);
        if ((cards !== maxCards) && (newWords !== maxWords)) {
            return this.view.renderFinish(cards, newWords, longSetToday, percentage, false);
        } 

        return this.view.renderFinish(cards, newWords, longSetToday, percentage, true);
    }

    renderProgressCallback() {
        const min = this.model.learning.getStatisticsObjectFromLocal('cardToday');
        const max = this.model.learning.getLearnSettingsFromLocal('maxCardsPerDay');
        return this.view.renderProgress(min, max);
    }

    countWords() {
        return ControllerLinguist.countRestForToday(this.model.learning.getNewWordsFromLocal(), this.model.learning.getStatisticsObjectFromLocal('newWordsToday'));
    }

    countCards() {
        return ControllerLinguist.countRestForToday(this.model.learning.getLearnSettingsFromLocal('maxCardsPerDay'), this.model.learning.getStatisticsObjectFromLocal('cardToday'));
    }

    getMode() {
        const set = this.model.learning.getSettingsFromLocal();
        return set.optional.linguist.learn.wordsComposition;
    }

    static countRestForToday(numberForToday, learnedNumber) { 
        return numberForToday - learnedNumber;
    }

    getLastDate() {
        const dateString = this.model.learning.getFromLocal('lastDate');
        const date = new Date(+ dateString);
        return this.model.learning.getStringDate(date);
    }

    static checkMainOptionsForm(newWordsNumber, maxCardsNumber) {
        if (parseInt(newWordsNumber, 10) > parseInt(maxCardsNumber, 10)) { 
          return 'Number of cards should be more then number of new words';
        }
        return '';
    }

    analyzeMainOptionsForm(checkResult) {
        let message = checkResult;
        if (!checkResult) { 
            message = 'Save';
            this.saveLearnSettings().then(value => {
                if (value) { 
                    this.view.renderStartPage(this.countWords(), this.countCards(), this.getLastDate(), '');
                }
            });
        } 
        this.view.showSaveMessage(message, this.view.appSettings, 'mainMessage'); 
    }

    async saveLearnSettings() {
        const data = this.model.learning.saveLearnSettings(this.view.getNewWordsElements().getValue(), ControllerLinguist.createMainSettingsObject(this.view.getSettingsElements(this.view.appSettings)));
        return data;
    }

    static createMainSettingsObject(listOfElements) {
        const settingsObject = {};
        listOfElements.forEach((item) => {
            const key = item.getAttributeValue('data-settings');
            if (key !== 'wordsPerDay') {
                settingsObject[key] = item.getValue();
            }
        });     
        return settingsObject;
    }

    async getWordArray(newWords, cards, mode) {
        let numberOfNewWords = newWords;
        const numberOfCards = cards;
        let numberOfLearnedWords = 0;
        let learnedArray = [];
        let newArray = [];
        let mix = [];
        const learnedArrayFull = await this.model.words.getUserWords();
        const level = await this.model.settings.getUserDifficultySettings() - 1; 

        if (this.groupForTrain) {
            if (this.groupForTrain === 21) {
               const hardArray = learnedArrayFull.filter((item) => item.optional.interval === 1 || item.optional.interval === 2);
               if (hardArray.length === 0) {
                    this.view.renderStartPage(null, null, null, `You don't have hard words`, 'error-message');
                    return false;
                }
          
                mix = hardArray.slice(0, Math.min(numberOfCards, hardArray.length));
            } else {
                const specialArray = learnedArrayFull.filter((item) => item.optional.special === this.groupForTrain);
                if (specialArray.length === 0) {
                    this.view.renderStartPage(null, null, null, `You don't have any words in "${this.groupForTrain}" group`, 'error-message');
                    return false;
                }
              
                mix = specialArray.slice(0, Math.min(numberOfCards, specialArray.length));
            }
            
        } else {
            if (cards === 0 ) {
                this.view.renderStartPage(null, null, null, `You don't have cards`, 'error-message');
                return false;
            }
        
            if (newWords === 0 && (mode === 'all' || mode === 'new')) {
                this.view.renderStartPage(null, null, null, `You don't have new words`, 'error-message');
                return false;
            }
            
            if (mode === 'all' || mode === 'new') {
                if (newWords > cards) {
                    numberOfNewWords = numberOfCards;
                } 
                const newArrayOfGroup = await this.getOnlyNewWordsOfGroup(level, learnedArrayFull);
                if (newArrayOfGroup.length < newWords) {
                    this.view.renderStartPage(null, null, null, `You have only ${newArrayOfGroup.length} new words for this level! You can change level, reduce number of new words or repeat learned words.`, 'error-message');
                    return false;
                }
                newArray = newArrayOfGroup.slice(0, numberOfNewWords);
            }
        
            if (mode === 'all' || mode === 'learned') {  
                const learnedWordsForRepeat = this.getWordsToRepeat(learnedArrayFull);
                const repeatWordsNumber = learnedWordsForRepeat.length;
                if (mode === 'all')  {
                    numberOfLearnedWords = cards - newWords;
                    if (repeatWordsNumber < numberOfLearnedWords) {
                        numberOfLearnedWords = repeatWordsNumber;
                    }
                } else {
                    if (repeatWordsNumber === 0) {
                        this.view.renderStartPage(null, null, null, "You don't have words to repeat in this time!", 'error-message');
                        return false;
                    }
                    if (repeatWordsNumber >= cards) {
                        numberOfLearnedWords = cards;
                    } else {
                        numberOfLearnedWords = repeatWordsNumber;
                    }
                }
                learnedArray = learnedWordsForRepeat.slice(0, numberOfLearnedWords); 
            } 
            mix = [...newArray, ...learnedArray];
        }
        
        const shuffleArray = this.shuffle(mix); 

        const wordsArray = shuffleArray.map((item) => {
            return new UserWord(item, true);
        });
        this.model.shuffleArray = wordsArray;
        return wordsArray;
    }

    async getOnlyNewWordsOfGroup(group, learnedArray) {
        const newArrayFull = await this.model.words.getWordsOfGroup(group, 600); 
        const learnedArrayOfGroup = ControllerLinguist.getLearnedWordsOfGroup(group, learnedArray);
        const onlyNewArray = newArrayFull.filter((newItem) => {
            const array = learnedArrayOfGroup.filter((oldItem) => oldItem.wordId === newItem.id);
            if (array.length === 0) {
                return true;
            }
            return false;
        });
        return onlyNewArray;
    }

    static getLearnedWordsOfGroup(group, learnedArray) {
        return learnedArray.filter((item) => item.optional.group === group);
    }

  getWordsToRepeat(wordsArray) {
      const importantArray = [];
      const repeatArray = [];
      const zeroArray = [];
      wordsArray.forEach((item) => {
          if (item.optional.interval === 1 || item.optional.important === true) {
              importantArray.push(item);
          } else if(item.optional.interval > 1 && item.optional.interval < 6) { 
                repeatArray.push(item);   
          } else if (item.optional.interval === 6) {
              zeroArray.push(item);
          } 
      });
      const repeatNowArray = this.getReadyToRepeatWords(repeatArray);
      return [...importantArray, ...repeatNowArray, ...zeroArray];
  }

  getReadyToRepeatWords(array) {
      const currentTime = Date.now();
      const againInterval = MINUTES_INTERVAL;
      const hardInterval = this.model.learning.getLearnSettingsFromLocal('hardInterval') * MINUTES_INTERVAL;
      const goodInterval = this.model.learning.getLearnSettingsFromLocal('goodInterval') * HOURS_INTERVAL;
      const easyInterval = this.model.learning.getLearnSettingsFromLocal('easyInterval') * DAYS_INTERVAL;
      const learnedInterval = this.model.learning.getLearnSettingsFromLocal('learnedInterval') * DAYS_INTERVAL;
      return array.filter((item) => {
          const date = item.optional.date;
          let interval;
          if (item.optional.interval === 1) {
              interval = againInterval;
          }
          if (item.optional.interval === 2) {
              interval = hardInterval;
          }
          if (item.optional.interval === 3) {
              interval = goodInterval;
          }
          if (item.optional.interval === 4) {
              interval = easyInterval;
          }
          if (item.optional.interval === 5) {
              interval = learnedInterval;
          }
          if ((date + interval) <= currentTime) {
              return true;
          } 
          return false;
      });
  }


    getNextWordFromLocal(){ 
        const array = this.model.shuffleArray;
        if (array) {
            if (array.length === 0) {
                return null;
            }
          const word = array.shift();
          this.model.shuffleArray = array;
          return word;
      } 
        return false;
    }

    static checkCardOptionsForm(list) {
        const checked = list.filter((item) => item.getValue() === true);
        if (checked.length === 0) {
            return 'Choose at least one of the tips';
        }
        return '';
    }

    analyzeCardOptionsForm(checkResult) {
        let message = checkResult;
        if (!checkResult) {
            message = 'Save';
            this.saveCardSettings().then((data) => this.view.renderSlide(data.optional.linguist.cards));
        } 
        this.view.showCardSaveMessage(message);
    }

    async saveCardSettings() {  
        const data = this.model.learning.saveCardSettings(ControllerLinguist.createMainSettingsObject(this.view.getSettingsElements(this.view.cardSettings)));
        return data;
    }

    async countSaveStudyResult(wordObj, isRepeat) {
        if (!this.groupForTrain) {
            let wordNumber = 0;
            let cardNumber = 0;
            const todayCards = this.model.learning.getStatisticsObjectFromLocal('cardToday');
            const maxCards = this.model.learning.getLearnSettingsFromLocal('maxCardsPerDay');
            let repeatsToday = this.model.learning.getLearnSettingsFromLocal('repeatToday');
            if (maxCards - todayCards === 0) {
                return false;
            }
            if (isRepeat) {
                repeatsToday += 1;
                const set = await this.model.learning.upsertLinguistPropsStatistics(repeatsToday, 'repeatToday');
                this.model.learning.saveStatisticsToLocal(set);
            }
            if (!isRepeat) {
                cardNumber = todayCards+1;
            }
            if (wordObj.optional.total === 1) {
                const wordsToday = this.model.learning.getStatisticsObjectFromLocal('newWordsToday');
                wordNumber = wordsToday + 1;
            } 
            if (wordNumber !== 0 ) {
                const set = await this.model.learning.upsertLinguistPropsStatistics(wordNumber, 'newWordsToday');
                this.model.learning.saveStatisticsToLocal(set);
            }
            if (cardNumber !== 0) {
                const set = await this.model.learning.upsertLinguistPropsStatistics(cardNumber, 'cardToday');
                this.model.learning.saveStatisticsToLocal(set);
            }
        }
        if (wordObj.optional.isLearned === true) {
            await this.model.learning.increaseLearnedWords();
            await this.model.learning.saveRightSet(true);
        }
        if (wordObj.optional.isLearned === 'again') {
            await this.model.learning.saveRightSet(true);
        }
        if (wordObj.optional.isLearned === false) {
            await this.model.learning.saveRightSet(false);
        }
        
        if (wordObj.optional.currentError !== 0 || wordObj.optional.isKnown === false || wordObj.optional.interval === 1) {
            wordObj.optional.date = Date.now();
            wordObj.learnedAgain = true;
            this.model.repeatWords.push(wordObj);
        }
        return wordObj;
    }
}

export default ControllerLinguist;