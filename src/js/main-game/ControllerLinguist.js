import UserWord from './LinguistComponents/UserWord';
import defaultLearningSettings from './assets/defaultLearningSettings';
import defaultLearningStatistics from './assets/defaultLearningStatistics';
import {
  MINUTES_INTERVAL,
  HOURS_INTERVAL,
  DAYS_INTERVAL
} from './assets/CONST';

class ControllerLinguist {
  constructor(view, model, groupForTrain) {
    this.view = view;
    this.model = model;
    this.groupForTrain = groupForTrain;
     this.start();

  }

  async start() { 
    const date = await this.model.learning.startLearningStatistics(defaultLearningStatistics);
    console.log('start', date);
    await this.model.learning.startLearningSettings(defaultLearningSettings);
    this.view.start();
    this.view.bindWindow(this.countWords(), this.countCards(), this.getLastDate());

    this.view.bindRenderMainOpt(this.model.learning.getStatisticsObjectFromLocal.bind(this.model.learning), this.model.learning.getNewWordsFromLocal.bind(this.model.learning), this.model.learning.getLinguistSettingsFromLocal.bind(this.model.learning));
    
    this.view.bindSaveMainOpt(this.checkMainOptionsForm, this.analyzeMainOptionsForm.bind(this));

    this.view.bindStudyNow(() => { return this.getWordArray(this.countWords(), this.countCards(), this.getMode())}, this.model.learning.getSettingsFromLocal, this.getNextWordFromLocal.bind(this), this.renderProgressCallback.bind(this));

    this.view.bindRenderCardOpt(this.model.learning.getLinguistSettingsFromLocal.bind(this.model.learning));

    this.view.bindSaveCardOpt(this.checkCardOptionsForm, this.analyzeCardOptionsForm.bind(this));

    this.view.bindNextSlide(this.model.learning.getSettingsFromLocal, this.getNextWordFromLocal.bind(this), this.countSaveStudyResult.bind(this), this.model.words.upsertUserWord.bind(this.model.words), this.renderFinishCallback.bind(this), this.renderProgressCallback.bind(this), this.addWords.bind(this));
  }

  addWords() {

  if(this.model.repeatWords.length > 0) {
    const currentTime = Date.now();
    const againInterval = MINUTES_INTERVAL;
    const date = this.model.repeatWords[0].optional.date;

  const word = this.model.repeatWords.shift();

  this.model.shuffleArray.unshift(new UserWord(word, true));
  
//}
  
  }
  
  }

  renderFinishCallback() {
    const cards = this.model.learning.getStatisticsObjectFromLocal('cardToday');
    const newWords = this.model.learning.getStatisticsObjectFromLocal('newWordsToday');
    const correctAnswers = this.model.learning.getStatisticsObjectFromLocal('rightsToday');
    const longSetToday = this.model.learning.getStatisticsObjectFromLocal('longSetToday');
     const percentage = Math.round((correctAnswers / cards) * 100);
    const allCards = this.model.learning.getLearnSettingsFromLocal('maxCardsPerDay');
    const allWords = this.model.learning.getNewWordsFromLocal();
    
    if ((cards !== allCards) && (newWords !== allWords)) {
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
    return this.countRestForToday(this.model.learning.getNewWordsFromLocal(), this.model.learning.getStatisticsObjectFromLocal('newWordsToday'));
  }

  countCards() {
    return this.countRestForToday(this.model.learning.getLearnSettingsFromLocal('maxCardsPerDay'), this.model.learning.getStatisticsObjectFromLocal('cardToday'))
  }
  getMode() {
    const set = this.model.learning.getSettingsFromLocal();
    return set.optional.linguist.learn.wordsComposition;
  }

  countRestForToday(numberForToday, learnedNumber) { 
    return numberForToday - learnedNumber;
  }

  getLastDate() {
    const dateString = this.model.learning.getFromLocal('lastDate');
    const date = new Date(+ dateString);
    return this.model.learning.getStringDate(date);
  }

  checkMainOptionsForm(newWordsNumber, maxCardsNumber, mode) {
    //if (mode === 'all' || mode === 'new') {
      if (parseInt(newWordsNumber) > parseInt(maxCardsNumber)) { 
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
    const data = this.model.learning.saveLearnSettings(this.view.getNewWordsElements().getValue(), this.createMainSettingsObject(this.view.getSettingsElements(this.view.appSettings)));
    return data;
  }

  createMainSettingsObject(listOfElements) {
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
    let numberOfCards = cards;
    let numberOfLearnedWords = 0;
    let learnedArray = [];
    let newArray = [];
    let mix = [];
    const learnedArrayFull = await this.model.words.getUserWords();
    const level = await this.model.settings.getUserDifficultySettings(); 
console.log('learnedArrayFull', learnedArrayFull);
    if (this.groupForTrain) {
      mix = learnedArrayFull.filter((item) => item.optional.special === this.groupForTrain);
      if (mix.length === 0) {
        this.view.renderStartPage(null, null, null, `You don't have any words in "${newArrayOfGroup.length}" group`);
        return false;
      }
    } else {
      if (cards === 0 ) {
        this.view.renderStartPage(null, null, null, `You don't have cards`);
        return false;
      }
  
      if (newWords === 0 && (mode === 'all' || mode === 'new')) {
        this.view.renderStartPage(null, null, null, `You don't have new words`);
        return false;
      }
      
      
      if (mode === 'all' || mode === 'new') {
        if (newWords > cards) {
          numberOfNewWords = numberOfCards;
        } 
        // if (mode === 'all' && newWords >= cards) {
        //   this.view.renderStartPage(null, null, null, 'For learning all words, please, increase number of cards or learning mode');
        //   return false;
        // }
        //const arrayOfGroup = await this.model.learning.getWordsOfGroup(level, 600); 
        const newArrayOfGroup = await this.getOnlyNewWordsOfGroup(level, learnedArrayFull);
        if (newArrayOfGroup.length < newWords) {
          this.view.renderStartPage(null, null, null, `You have only ${newArrayOfGroup.length} new words for this level! You can change level, reduce number of new words or repeat learned words.`);
          return false;
        }
  
        newArray = newArrayOfGroup.slice(0, numberOfNewWords);
      }
  
      if (mode === 'all' || mode === 'learned') {  
        //const allLearnedWordsNumber = learnedArrayFull.length; 
        const learnedWordsForRepeat = this.getWordsToRepeat(learnedArrayFull); //todo sort
        //const learnedWordsForRepeat = learnedArrayFull;
        const repeatWordsNumber = learnedWordsForRepeat.length;
       
        if (mode === 'all')  {
          numberOfLearnedWords = cards - newWords;
          if (repeatWordsNumber < numberOfLearnedWords) {
            numberOfLearnedWords = repeatWordsNumber;
          }
        } else {
          if (repeatWordsNumber === 0) {
            this.view.renderStartPage(null, null, null, "You don't have words to repeat!");
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
    

    

    
    
    let shuffleArray = []; 
    this.shuffle(mix.length).forEach((item) => {
      const elem = new UserWord(mix[item], true);
      shuffleArray.push(elem);
    });
   console.log('shuffleArray', shuffleArray);
   
//this.model.saveToLocal(shuffleArray, 'shuffleArray');
    this.model.shuffleArray = shuffleArray;
    return shuffleArray;
  }

  async getOnlyNewWordsOfGroup(group, learnedArray) {
    const newArrayFull = await this.model.words.getWordsOfGroup(group, 600); 
    const learnedArrayOfGroup = this.getLearnedWordsOfGroup(group, learnedArray);
    const onlyNewArray = newArrayFull.filter((newItem) => {
      const array = learnedArrayOfGroup.filter((oldItem) => oldItem.wordId === newItem.id);
      if (array.length === 0) {
        return true;
      }
      return false;
    });
    return onlyNewArray;
  }

  getLearnedWordsOfGroup(group, learnedArray) {
    return learnedArray.filter((item) => item.optional.group === group);
  }

  shuffle(n) {
    const numPool = [];
    for (let index = 0; index < n; index++) {
      numPool.push(index);
    }
  
    for (
      let j, x, i = numPool.length; i;
      j = parseInt(Math.random() * i),
      x = numPool[--i],
      numPool[i] = numPool[j],
      numPool[j] = x
    );
  
    return numPool;
  }

getWordsToRepeat(wordsArray) {
  const importantArray = [];
  const repeatArray = [];
  
  const zeroArray = [];
  wordsArray.forEach((item) => {
    if (item.optional.important === true) {
      importantArray.push(item);
    } else if(item.optional.hasOwnProperty('rating')) {
      repeatArray.push(item);
    } else {
      zeroArray.push(item);
    }
    
  });
  const repeatNowArray = this.getReadyToRepeatWords(repeatArray);
  console.log('...repeatNowArray, ...importantArray, ...zeroArray', repeatNowArray, importantArray, zeroArray);
  return [...repeatNowArray, ...importantArray, ...zeroArray];
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
  if (item.optional.rating === 1) {
    interval = againInterval;
  }
  if (item.optional.rating === 2) {
    interval = hardInterval;
  }
  if (item.optional.rating === 3) {
    interval = goodInterval;
  }
  if (item.optional.rating === 4) {
    interval = easyInterval;
  }
  if (item.optional.rating === 5) {
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

  checkCardOptionsForm(list) {
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
  const data = this.model.learning.saveCardSettings( this.createMainSettingsObject(this.view.getSettingsElements(this.view.cardSettings)));
  return data;
}












  async countSaveStudyResult(wordObj, isRepeat) {
    
    
    let wordNumber = 0;
    let cardNumber = 0;
    
    const todayCards = this.model.learning.getStatisticsObjectFromLocal('cardToday');
    //const cardNu = this.model.getFromLocal('settings').optional.cardToday;
    const maxCards = this.model.learning.getLearnSettingsFromLocal('maxCardsPerDay');
    //const cardNun = this.model.getFromLocal('settings').optional.maxCardsPerDay;
   
    if (maxCards - todayCards === 0) {
      return false;
    }

    if (!isRepeat) {

    cardNumber = todayCards+1;


    }

    
    if (wordObj.optional.total === 1) {

      const wordsToday = this.model.learning.getStatisticsObjectFromLocal('newWordsToday');
      
    wordNumber = wordsToday+1;

    } 
    
    if (wordNumber !==0 ) {
      const set = await this.model.learning.upsertLinguistPropsStatistics(wordNumber, 'newWordsToday');
      //set = this.updateSettingsObject({key: 'newWordsToday', value: wordNumber}, this.model.getFromLocal('settings'));
      this.model.learning.saveStatisticsToLocal(set);
    }
    if (cardNumber != 0) {
      
      const set = await this.model.learning.upsertLinguistPropsStatistics(cardNumber, 'cardToday');
      //set = this.updateSettingsObject({key: 'cardToday', value: cardNumber}, set);
      this.model.learning.saveStatisticsToLocal(set);
      
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
    
if (wordObj.optional.currentError !== 0 || wordObj.optional.isKnown === false) {
  
  wordObj.optional.date = Date.now();
  wordObj.learnedAgain = true;
  this.model.repeatWords.push(wordObj);
  console.log('this.model.repeatWords', this.model.repeatWords);
}


    return wordObj;
  }


}
export default ControllerLinguist;