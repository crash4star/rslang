import GeneralContainerElement from './UIComponents/GeneralContainerElement';
import ButtonElement from './UIComponents/ButtonElement';
import LearningCard from './LinguistComponents/LearningCard';
import UserWord from '../utils/UserWord';
import Progress from './UIComponents/Progress';

class ViewLinguist {
    constructor(appSettingsForm, appSettingsBtn, cardSettings, cardSettingsBtn, endModal, endBtn) {
        const main = document.querySelector('.main');
        this.mainContainer = main.querySelector('.container');
        this.startPage = new GeneralContainerElement('div', 'start-game');
        this.appSettings = appSettingsForm;
        this.appSettingsBtn = appSettingsBtn;
        this.cardSettingsBtn = cardSettingsBtn;
        this.cardSettings = cardSettings;
        this.endModal = endModal;
        this.endBtn = endBtn;
        this.prev = 0;
        this.next = 0;
        this.progress = new Progress('learn-progress');
    }

    start() {
        this.addMainMarkup();
        this.initSwiper();
        ViewLinguist.buildStartPage(this.startPage, this.appSettings, this.appSettingsBtn);
        document.querySelector('#cardsSettings').append(this.cardSettings.getHTML());
        document.querySelector('#cardsSettings').append(this.endModal.getHTML());
        document.querySelector('#cardsSettings').append(this.cardSettingsBtn.getHTML());
        document.querySelector('#cardsSettings').append(this.endBtn.getHTML());
        document.querySelector('#game-wrapper').classList.add('hidden');
        this.endBtn.addStyles('none'); 
        document.querySelector('.swiper-container').append(this.progress.getHTML());
        this.slider.navigation.prevEl.addEventListener('click', () => {
            this.prev += 1;
            this.next = 0; 
        }); 
        ViewLinguist.disableInputNumber();
    }

    static disableInputNumber() {
        document.querySelectorAll('[type = "number"]').forEach((item) => {
            item.onkeypress = function() {
                return false;
            }
        }); 
    }

    addMainMarkup() {
        document.querySelector('#root').innerText = '';
        this.mainContainer.innerHTML = '<div id="start-wrapper"></div><div id="game-wrapper"><div id="cardsSettings"></div><div id="linguist"><div id="slider-wrapper"></div></div></div>';
        document.querySelector('#slider-wrapper').innerHTML = '<div class="swiper-container"><div class="swiper-wrapper"></div><div class="swiper-pagination" style="background-color: aqua; top: none;"></div><div class="swiper-button-next"></div><div class="swiper-button-prev"></div></div>';
    }

    static buildStartPage(startPage, optionsForm, optionsBtn) {
        document.querySelector('#start-wrapper').append(startPage.getHTML());
        startPage.addHTML('<h3>Learning new words</h3>');
        const newWordsToday = new GeneralContainerElement('p', 'newWordsToday');
        const numberOfNewWordsToday = new GeneralContainerElement('span', 'numberOfNewWordsToday');
        numberOfNewWordsToday.addHTML('0');
        newWordsToday.addHTML('<span>New words for today:  </span>');
        newWordsToday.addChildren(numberOfNewWordsToday);
        const cardToday = new GeneralContainerElement('p', 'cardsToday');
        const numberOfCardsToday = new GeneralContainerElement('span', 'numberOfCardsToday');
        numberOfCardsToday.addHTML('0');
        cardToday.addHTML('<span>Cards for today:  </span>');
        cardToday.addChildren(numberOfCardsToday);

        const lastDateContainer = new GeneralContainerElement('p', 'lastDateContainer');
        const lastDate = new GeneralContainerElement('span', 'lastDate');
        lastDate.addHTML('0');
        lastDateContainer.addHTML('<span>Last visit:  </span>');
        lastDateContainer.addChildren(lastDate);

        const message = new GeneralContainerElement('p', 'start-message');
        message.addStyles('start-message');

        const btnContainer = new GeneralContainerElement('div', 'btnContainer');
        btnContainer.addStyles('flex-between');
        const studyNowBtn = new ButtonElement('studyNowBtn', 'Study now >');
        studyNowBtn.addStyles('btn', 'btn-secondary');
        btnContainer.addChildren(optionsForm, optionsBtn, studyNowBtn);
      
        startPage.addChildren(newWordsToday, cardToday, lastDateContainer, message, btnContainer);
    }

    initSwiper() {
        this.slider = new Swiper('.swiper-container', {
            autoHeight: true,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            centerInsufficientSlides: true,
            shortSwipes: false,
            longSwipes: false,
            followFinger: false,

            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
        this.slider.childrenList = [];
    }

    bindWindow(newWord, card, date) {
        this.renderStartPage(newWord, card, date, ''); 
    }

  renderStartPage(words, cards, date, message, style) {
      if (Number.isInteger(words) && Number.isInteger(cards)) {  
          this.startPage.getDescendantById('numberOfNewWordsToday').updateHTML(words);
          this.startPage.getDescendantById('numberOfCardsToday').updateHTML(cards);
          this.startPage.getDescendantById('lastDate').updateHTML(date);
      }
      
      if (message) { 
          this.startPage.getDescendantById('start-message').updateHTML(message);
          this.startPage.getDescendantById('start-message').removeStyle('message');
          this.startPage.getDescendantById('start-message').removeStyle('error-message');
          this.startPage.getDescendantById('start-message').addStyles(style);
      }
  }

    bindRenderMainOpt(handlerStatFromLocal, handlerWords, handlerOpt) {
        const wordNumberDone = handlerStatFromLocal('newWordsToday');
        const cardNumberDone = handlerStatFromLocal('cardToday');
        const settingsElements = this.getSettingsElements(this.appSettings);
        this.appSettingsBtn.getHTML().addEventListener('click', () => {
            this.renderSettings(settingsElements, handlerWords(), handlerOpt('learn'));
            if (wordNumberDone <= 1) {
                const elem = this.appSettings.getDescendantById('wordsPerDay');
                elem.addAttribute('min', '1');
            } else {
                const elem = this.appSettings.getDescendantById('wordsPerDay');
                elem.addAttribute('min', wordNumberDone);
            }
            if (cardNumberDone <= 1) {
                const elem = this.appSettings.getDescendantById('maxCardsPerDay');
                elem.addAttribute('min', '1');
            } else {
                const elem = this.appSettings.getDescendantById('maxCardsPerDay');
                elem.addAttribute('min', cardNumberDone);
            } 
        });
    }

    bindSaveMainOpt(checkFunc, analyzeFunc) {
        this.appSettings.getDescendantById('mainSaveSettingsBtn').getHTML().addEventListener('click', () => {
            const message = checkFunc(this.appSettings.getDescendantById('wordsPerDay').getValue(), this.appSettings.getDescendantById('maxCardsPerDay').getValue(), this.appSettings.getDescendantById('wordsComposition').getValue()); 
            analyzeFunc(message);
        });
    }

    getSettingsElements(form) {
        return form.getDescendantsByAttribute('data-settings');
    }

    getNewWordsElements() {
        return this.appSettings.getDescendantById('wordsPerDay');
    }

    renderSettings(items, words, options) {
        this.showSaveMessage('', this.appSettings, 'mainMessage');
        this.showSaveMessage('', this.cardSettings, 'error-message');
        items.forEach((item) => { 
            const key = item.getAttributeValue('data-settings');
            if (key === 'wordsPerDay') {
                item.setValue(words);
            } else  {
                item.setValue(options[key]);
            }
        });
    }

    showSaveMessage(message, form, id) {
        form.getDescendantById(id).updateHTML(message);  
    }

    bindStudyNow(arrayOfWord, settings, wordHandler, progressHandler) {
        this.startPage.getDescendantById('studyNowBtn').getHTML().addEventListener('click', () => {
            this.renderStartPage(null, null, null, 'Loading', 'message');
            arrayOfWord().then(value => {
                if (value) {
                    this.createCard(settings, wordHandler);
                    progressHandler();
                    this.startPage.addStyles('none');
                    document.querySelector('#game-wrapper').classList.remove('hidden');
                    return true;
                } 
                return false;
                
            });
        })
    }

    createCard(settings, getWord) {
        const cardSettings = settings().optional.linguist.cards;
        const word = getWord();
        if (!word) {
            return false;
        }
        this.addSlide();
        this.addCard(cardSettings, word);
        return true;
    }

    addSlide() { 
        this.slider.appendSlide('<div class="swiper-slide"></div>'); 
    }

    bindRenderCardOpt(optionsHandler) {
        this.cardSettingsBtn.getHTML().addEventListener('click', () => {
            const settingsElements = this.getSettingsElements(this.cardSettings);
            const settings = optionsHandler('cards');
            this.renderSettings(settingsElements, null, settings);
        });
    }

    bindSaveCardOpt(checkFunc, analyzeFunc) {
        this.cardSettings.getHTML().addEventListener('submit', (event) => {
            event.preventDefault();
            const message = checkFunc(this.cardSettings.getDescendantById('fieldOfTips').getDescendantsByAttribute('data-settings')); 
            analyzeFunc(message);
        });
    }

    renderSlide(settings) {
        const word = this.getCurrentCard().wordObject.body;
        const newWord = new UserWord(word, true);
        this.slider.slides[this.slider.childrenList.length -1].innerHTML = '';
        this.slider.childrenList.pop();
        this.addCard(settings, newWord);
    }

    getCurrentCard() {
        return this.slider.childrenList[this.slider.childrenList.length -1];
    }

    showCardSaveMessage(message) {
        this.cardSettings.getDescendantById('error-message').updateHTML(message);  
    };

    clickKnownBtn(card) {
        card.showAfterCheck();
        card.wordElement.showWord();
        card.getDescendantById('knowBtn').addStyles('no-pointer');
        card.getDescendantById('checkWordBtn').addStyles('no-pointer');
        this.doNextBtnActive();
        card.getDescendantById('noKnowBtn').addStyles('no-pointer');
        card.showWordInSentence();
        card.getDescendantById('learnAudio').playAll();
        card.getDescendantById('repeatAudio').removeStyle('no-pointer');
    }

    addCard(settings, word) {
        const card = new LearningCard(word, settings);
        // card.getDescendantById('repeatAudio').getHTML().addEventListener('click', (event) => {
        //     if (event.target.classList.contains('speaker-on-btn')) {
        //         card.getDescendantById('learnAudio').playAll();
        //         event.target.classList.remove('speaker-on-btn');
        //         event.target.classList.add('speaker-out-btn');
        //     } else {
        //         card.getDescendantById('learnAudio').stop();
        //         event.target.classList.add('speaker-on-btn');
        //         event.target.classList.remove('speaker-out-btn');
        //     }
            
          
            
        // });
        
        card.getDescendantById('knowBtn').getHTML().addEventListener('click', () => {
            card.wordObject.isKnown = true;
            this.clickKnownBtn(card);
        });
        
        card.getDescendantById('noKnowBtn').getHTML().addEventListener('click', () => {
            card.wordObject.isKnown = false;
            this.clickKnownBtn(card);
        });
        
        card.getDescendantById('wrapperIntervalBtns').getHTML().addEventListener('click', (event) => {
            event.currentTarget.children.forEach((item) => {
                item.classList.remove('btn-primary');
                item.classList.add('btn-secondary');
            });
            if (event.target.type === 'button') {
                card.wordObject.setIntervalValue(event.target.value);
                event.target.classList.add('btn-primary');
                event.target.classList.remove('btn-secondary');
            }
        });

        card.getDescendantById('deleteBtn').getHTML().addEventListener('click', (event) => {
            card.wordObject.deleted = true; 
            event.target.classList.remove('btn-secondary');
            event.target.classList.add('btn-primary');
            event.target.innerText = 'Deleted';
        });

        card.getDescendantById('specialBtn').getHTML().addEventListener('click', () => {
            const text = card.getDescendantById('specialBtn').getHTML().innerHTML;
            if (text === 'Tick as "special"') {
                card.getDescendantById('specialBtn').getHTML().innerHTML = 'Save';
                card.getDescendantById('specialInput').removeStyle('hidden');
            } else {
                card.getDescendantById('specialBtn').getHTML().innerHTML = 'Tick as "special"';
                card.getDescendantById('specialInput').addStyles('hidden');
                card.wordObject.special = card.getDescendantById('specialInput').getValue();
            }
        });
        this.slider.childrenList.push(card);
        const i = this.slider.slides.length - 1;
        this.slider.slides[i].append(card.getHTML());
        card.getDescendantById('checkWordBtn').getHTML().addEventListener('click', () => {
            card.wordObject.increaseTries();
            const error = card.wordElement.checkWord();
            const res = card.wordElement.showCheckedWord(error);
            if (res) {
                card.getDescendantById('checkWordBtn').addStyles('no-pointer');
                this.slider.navigation.nextEl.classList.remove('swiper-button-disabled');
                card.showWordInSentence();
                card.showAfterCheck();
                card.wordElement.showWord();
                card.getDescendantById('learnAudio').playAll();
                card.getDescendantById('repeatAudio').removeStyle('no-pointer');
            } else {
                card.wordObject.currentError += error.length;
            }
        });

        const input = document.querySelector('.word-input');
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                card.getDescendantById('checkWordBtn').getHTML().click();
            } 
        });
    }

    bindNextSlide(settings, getWord, counterHandler, saveHandler, handlerRender, progressHandler, addWordsHandler) { 
        this.slider.navigation.nextEl.addEventListener('click', () => {this.nextHandler(settings, getWord, counterHandler, saveHandler, handlerRender, progressHandler, addWordsHandler)});
    }

    async nextHandler(settings, getWord, counterHandler, saveHandler, handlerRender, progressHandler, addWordsHandler) {

        this.slider.childrenList[this.slider.childrenList.length - 1].getDescendantById('learnAudio').stop();
        this.next += 1;
        if ((this.next > this.prev) || (this.next ===0 &&  this.prev === 0)) {
            const currentSlide = this.slider.childrenList.filter((item) => {
                return item.getHTML().parentNode.classList.contains('swiper-slide-active');
            })[0];
            this.slider.childrenList[this.slider.childrenList.length - 1].addStyles('no-pointer');     
            addWordsHandler();  
            const notEnd = this.createCard(settings, getWord);
            this.slider.childrenList[this.slider.childrenList.length - 1].getDescendantById('learnAudio').stop();
            const checkedWord = currentSlide.wordObject.getUserWord();
            checkedWord.wordId = currentSlide.wordObject.id;   
            await counterHandler(checkedWord, Object.prototype.hasOwnProperty.call(currentSlide.wordObject.body, 'learnedAgain'));   
            await saveHandler(currentSlide.wordObject.id, currentSlide.wordObject.getUserWord());  
            this.slider.slideNext();
            this.slider.update();
            this.slider.updateSize();
                if (notEnd === false) {
                    this.endBtn.getHTML().classList.remove('none');
                    this.cardSettingsBtn.addStyles('none');
                    document.querySelector('#endBtn').click();
                    await handlerRender();
                }
            progressHandler();
        }
    }

    bindRestart(restartHandler) {
        this.endModal.getDescendantById('restartBtn').getHTML().addEventListener('click', () => {
          this.endModal.getDescendantById('finishBtn').getHTML().click();
          restartHandler();
          
        });
    }

    renderFinish(cards, newWords, longSetToday, percentage, isFinish) {
        this.endModal.getDescendantById('cardsPassed').updateHTML(cards);
        this.endModal.getDescendantById('wordsPassed').updateHTML(newWords);
        this.endModal.getDescendantById('rightsPercentage').updateHTML(percentage);
        this.endModal.getDescendantById('setNumber').updateHTML(longSetToday);
        if (!isFinish) {
            this.endModal.getDescendantById('end-message').updateHTML('You repeated all necessary words');
        } 
    }

    renderProgress(min, max) {
        this.progress.setMin(min);
        this.progress.setMax(max); 
    }

    doNextBtnActive() {
        this.slider.navigation.nextEl.classList.remove('swiper-button-disabled');
    }
}

export default ViewLinguist;